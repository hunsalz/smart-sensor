#include "Esp8266.h"

void Esp8266::begin() {
  
  LOG.verbose(F("Setup ESP8266 ..."));
  // setup hardware components
  _bmp280Service.begin();
  _dhtService.begin(2, 22);
  _mq135Service.begin(A0);
  // setup WiFi client

  _stationModeGotIPHandler = WiFi.onStationModeGotIP([this](const WiFiEventStationModeGotIP &event) {

    LOG.verbose(F("Received IP [%s] from WiFi station."), event.ip.toString().c_str());

    // MQTT & NTP
    NTP_SERVICE.begin("europe.pool.ntp.org", UTC0100, 30);

    _mqttService.begin("m21.cloudmqtt.com", 13444);
    _mqttService.getMqttClient().setCredentials(MQTT_USER, MQTT_PASSWD);
  });

  _stationModeDisconnectedHandler = WiFi.onStationModeDisconnected([this](const WiFiEventStationModeDisconnected &event) {

    LOG.verbose(F("WiFi connection [%s] dropped. Reason: %d"), event.ssid.c_str(), event.reason);

    NTP_SERVICE.end();
    _mqttService.end();
  });

  WIFI_CLIENT.getWiFiMulti().addAP(WIFI_SSID_1, WIFI_PASSWD_1);
  WIFI_CLIENT.getWiFiMulti().addAP(WIFI_SSID_2, WIFI_PASSWD_2);
  WIFI_CLIENT.begin();
  // setup WiFi access point
  WIFI_STATION.begin(WIFI_AP_SSID, WIFI_AP_PASSWD);
  // setup MDNS
  MDNS_SERVICE.begin("esp8266");
  MDNS_SERVICE.getMDNSResponder().addService("http", "tcp", PORT);
  // MDNS_SERVICE.getMDNSResponder().addService("https", "tcp", 443);
  // setup web server
  SERVER.begin(PORT);
  // rewrite root context˘˘
  SERVER.getWebServer().rewrite("/", "/index.build.html");
  // handle static web resources
  SERVER.getWebServer().serveStatic("/", SPIFFS, "/www/", "max-age:15"); // cache-control 15 seconds
  // add dynamic http resources
  SERVER.on("/esp", HTTP_GET, [this](AsyncWebServerRequest *request) { SERVER.send(request, SYSTEM.getDetails()); });
  // ESP update options
  // TODO https://github.com/me-no-dev/ESPAsyncWebServer#setting-up-the-server
  SERVER.on("/esp", HTTP_POST, [this](AsyncWebServerRequest *request) {},
            [this](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) {

              DynamicJsonBuffer buffer;
              JsonVariant variant = buffer.parse((char *)data);
              if (variant.is<JsonObject &>() && variant.success()) {
                JsonObject &json = variant.as<JsonObject &>();
                if (json["loopInterval"].success()) {
                  SYSTEM.setLoopInterval(json["loopInterval"]);
                }
                if (json["deepSleepInterval"].success()) {
                  SYSTEM.setDeepSleepInterval(json["deepSleepInterval"]);
                }
              }
              // TODO corresponding HTTP status codes
              request->send(new AsyncBasicResponse(204));
            });

  SERVER.on("/fs/details", HTTP_GET,
            [this](AsyncWebServerRequest *request) { SERVER.send(request, FILESYSTEM.getStorageDetails()); });
  SERVER.on("/fs/listing", HTTP_GET,
            [this](AsyncWebServerRequest *request) { SERVER.send(request, FILESYSTEM.getFileListing()); });
  SERVER.on("/wifi/client", HTTP_GET,
            [this](AsyncWebServerRequest *request) { SERVER.send(request, WIFI_CLIENT.getDetails()); });

  // TODO https://github.com/me-no-dev/ESPAsyncWebServer#setting-up-the-server
  SERVER.on("/wifi/client", HTTP_POST, [this](AsyncWebServerRequest *request) {},
            [this](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) {

              DynamicJsonBuffer buffer;
              JsonVariant variant = buffer.parse((char *)data);
              if (variant.is<JsonObject &>() && variant.success()) {
                JsonObject &json = variant.as<JsonObject &>();
                if (json["disable"].success()) {
                  // WIFI_CLIENT.getWiFi().enableSTA(false);
                  LOG.verbose("disbale received!");
                  WiFi.mode(WIFI_OFF);
                }
              }
              // TODO corresponding HTTP status codes
              request->send(new AsyncBasicResponse(204));
            });

  SERVER.on("/wifi/station", HTTP_GET,
            [this](AsyncWebServerRequest *request) { SERVER.send(request, WIFI_STATION.getDetails()); });
  SERVER.on("/mdns", HTTP_GET, [this](AsyncWebServerRequest *request) { SERVER.send(request, MDNS_SERVICE.getDetails()); });
  SERVER.on("/ntp", HTTP_GET, [this](AsyncWebServerRequest *request) { SERVER.send(request, NTP_SERVICE.getDetails()); });
  SERVER.on("/sensor/dht", HTTP_GET,
            [this](AsyncWebServerRequest *request) { SERVER.send(request, _dhtService.getConfigAsJson()); });
  // DHT update options
  // TODO https://github.com/me-no-dev/ESPAsyncWebServer#setting-up-the-server
  SERVER.on("/sensor/dht", HTTP_POST, [this](AsyncWebServerRequest *request) {},
            [this](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) {

              DynamicJsonBuffer buffer;
              JsonVariant variant = buffer.parse((char *)data);
              if (variant.is<JsonObject &>() && variant.success()) {
                JsonObject &json = variant.as<JsonObject &>();
                _dhtService.begin(json);
              }
              // TODO corresponding HTTP status codes
              request->send(new AsyncBasicResponse(204));
            });
  SERVER.on("/sensor/last", HTTP_GET, [this](AsyncWebServerRequest *request) { SERVER.send(request, getLastSensorValues()); });

  // TODO probably a raise condition causes an error?
  SERVER.on("/test", HTTP_GET, [this](AsyncWebServerRequest *request) {

    // pinMode(2, OUTPUT);
    // delay(20);
    // pinMode(2, INPUT_PULLUP);

    DynamicJsonBuffer jsonBuffer;
    JsonObject &json = jsonBuffer.createObject();

    SERVER.send(request, json);
  });

  SERVER.on("/log", HTTP_GET, [this](AsyncWebServerRequest *request) {
    // request->send(new AsyncBasicResponse(200, "text/plain", esp8266util::LogFile.getLog()));
  });

  // add web socket support
  _wsl.onConnect([this](AsyncWebSocket *ws, AsyncWebSocketClient *client, AwsEventType type, AwsFrameInfo *info, uint8_t *data,
                        size_t len) {

    // send reply
    JsonArray &json = getLastSensorValues();
    uint16_t length = json.measureLength() + 1;
    char payload[length];
    json.printTo(payload, length);
    client->text(payload);
  });
  _wsl.onTextMessage([this](AsyncWebSocket *ws, AsyncWebSocketClient *client, AwsEventType type, AwsFrameInfo *info,
                            uint8_t *data, size_t len) {

    // TODO remove duplicate code with onConnect
    // send reply
    JsonArray &json = getLastSensorValues();
    uint16_t length = json.measureLength() + 1;
    char payload[length];
    json.printTo(payload, length);
    client->text(payload);
  });
  // add web socket
  AsyncWebSocket *webSocket = new AsyncWebSocket("/temperature");
  webSocket->onEvent([this](AsyncWebSocket *ws, AsyncWebSocketClient *client, AwsEventType type, void *arg, uint8_t *data,
                            size_t len) { _wsl.onEvent(ws, client, type, arg, data, len); });
  SERVER.getWebServer().addHandler(webSocket);

  SYSTEM.setLoopInterval(2000);

  // TODO SPIFFS not running request
  FILESYSTEM.getFileSystem();

  // define & add Appender
  _logger.getAppender().push_back(new RollingFileAppender(LOG_FILENAME, 40, 1024, true));

  LOG.verbose(F("========================="));
  LOG.verbose(F("Setup finished. Have fun."));
  LOG.verbose(F("========================="));
}

void Esp8266::run() {
  
  if (SYSTEM.nextLoopInterval()) {
    MDNS_SERVICE.getMDNSResponder().update();

    if (timeStatus() == timeSet) {
      LOG.verbose(F("TIME : %s"), NTP_SERVICE.getNTPClient().getTimeDate(NTP_SERVICE.getNTPClient().getLastSync()));
    }

    // LOG.verbose(F("First sync : %s"),
    // NTP_SERVICE.getNTPClient().getTimeDate(NTP_SERVICE.getNTPClient().getFirstSync().c_str());

    // _bmp280Service.update();
    // _dhtService.update();
    // _mq135Service.update();

    // _logger.verbose(F("DHT 22 - Temperature: %g"), _dhtService.getTemperature());
    // _logger.verbose(F("DHT 22 - Humidity: %g"), _dhtService.getHumidity());
    // _logger.verbose(F("BMP 280 - Temperature: %g"), _bmp280Service.getTemperature());
    // _logger.verbose(F("BMP 280 - Pressure: %g"), _bmp280Service.getPressure());
    // _logger.verbose(F("BMP 280 - Altitude: %g"), _bmp280Service.getAltitude());
    // _logger.verbose(F("MQ 135 - PPM: %g"), _mq135Service.getPPM());
    // _logger.verbose(F("MQ 135 - CO2: %g"), _mq135Service.getCO2());

    // _mqttService.publish("weather-station", getLastSensorValues());

    // char buffer[200];
    // sprintf(buffer, "TIME : %s", NTP_SERVICE.getNTPClient().getTimeDateString().c_str());

    // SYSTEM.deepSleep();
  }
}

JsonArray &Esp8266::getLastSensorValues() {
  
  DynamicJsonBuffer jsonBuffer;
  JsonArray &json = jsonBuffer.createArray();
  JsonObject &dht22 = json.createNestedObject().createNestedObject(F("dht22"));
  dht22["temperature"] = _dhtService.getTemperature();
  dht22["humidity"] = _dhtService.getHumidity();
  JsonObject &bmp280 = json.createNestedObject().createNestedObject(F("bmp280"));
  bmp280["temperature"] = _bmp280Service.getTemperature();
  bmp280["pressure"] = _bmp280Service.getPressure();
  bmp280["altitude"] = _bmp280Service.getAltitude();
  JsonObject &mq135 = json.createNestedObject().createNestedObject(F("mq135"));
  mq135["ppm"] = _mq135Service.getPPM();
  mq135["CO2"] = _mq135Service.getCO2();

  return json;
}
