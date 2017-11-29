#include "Esp8266.h"

void Esp8266::begin() {

  Log.verbose(F("Setup ESP8266 ..." CR));
  // setup hardware components
  bmp280Service.begin();
  dhtService.begin(2, 22);
  mq135Service.begin(A0);
  // setup WiFi client
  WIFI_CLIENT.getWiFiMulti().addAP(WIFI_SSID_1, WIFI_PASSWD_1);
  WIFI_CLIENT.getWiFiMulti().addAP(WIFI_SSID_2, WIFI_PASSWD_2);
  WIFI_CLIENT.begin();
  // setup WiFi access point
  WIFI_STATION.begin(WIFI_AP_SSID, WIFI_AP_PASSWD);
  // setup MDNS
  MDNS_SERVICE.begin("esp8266");
  MDNS_SERVICE.getMDNSResponder().addService("http", "tcp", PORT);
  //MDNS_SERVICE.getMDNSResponder().addService("https", "tcp", 443);
  // setup web server
  SERVER.begin(PORT);
  // rewrite root context˘˘
  SERVER.getWebServer().rewrite("/", "/index.build.html");
  // handle static web resources
  SERVER.getWebServer().serveStatic("/", SPIFFS, "/www/", "max-age:15"); // cache-control 15 seconds
  // add dynamic http resources
  SERVER.on("/esp", HTTP_GET, [this](AsyncWebServerRequest * request) {
    SERVER.send(request, SYSTEM.getDetails());
  });
  // ESP update options
  SERVER.on("/esp", HTTP_POST, [this](AsyncWebServerRequest * request) {
    // TODO
    // https://github.com/me-no-dev/ESPAsyncWebServer#setting-up-the-server
  }, [this](AsyncWebServerRequest * request, uint8_t *data, size_t len, size_t index, size_t total) {  
    
    DynamicJsonBuffer buffer;
    JsonVariant variant = buffer.parse((char*)data);
    if (variant.is<JsonObject&>() && variant.success()) {
      JsonObject &json = variant.as<JsonObject&>();
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



  
  SERVER.on("/fs/details", HTTP_GET, [this](AsyncWebServerRequest * request) {
    SERVER.send(request, FILESYSTEM.getStorageDetails());
  });
  SERVER.on("/fs/listing", HTTP_GET, [this](AsyncWebServerRequest * request) {
    SERVER.send(request, FILESYSTEM.getFileListing());
  });
  SERVER.on("/wifi/client", HTTP_GET, [this](AsyncWebServerRequest * request) {
    SERVER.send(request, WIFI_CLIENT.getDetails());
  });
  SERVER.on("/wifi/station", HTTP_GET, [this](AsyncWebServerRequest * request) {
    SERVER.send(request, WIFI_STATION.getDetails());
  });
  SERVER.on("/mdns", HTTP_GET, [this](AsyncWebServerRequest * request) {
    SERVER.send(request, MDNS_SERVICE.getDetails());
  });
  SERVER.on("/ntp", HTTP_GET, [this](AsyncWebServerRequest * request) {
    SERVER.send(request, NTP_SERVICE.getDetails());
  });
  SERVER.on("/sensor/dht", HTTP_GET, [this](AsyncWebServerRequest * request) {
    SERVER.send(request, dhtService.getConfigAsJson());
  });
  // DHT update options
  SERVER.on("/sensor/dht", HTTP_POST, [this](AsyncWebServerRequest * request) {
    // TODO
    // https://github.com/me-no-dev/ESPAsyncWebServer#setting-up-the-server
  }, [this](AsyncWebServerRequest * request, uint8_t *data, size_t len, size_t index, size_t total) {  
    
    DynamicJsonBuffer buffer;
    JsonVariant variant = buffer.parse((char*)data);
    if (variant.is<JsonObject&>() && variant.success()) {
      JsonObject &json = variant.as<JsonObject&>();
      dhtService.begin(json);
    }
    // TODO corresponding HTTP status codes
    request->send(new AsyncBasicResponse(204));
  });
  SERVER.on("/sensor/last", HTTP_GET, [this](AsyncWebServerRequest * request) {
    
    DynamicJsonBuffer jsonBuffer;
    JsonArray& json = jsonBuffer.createArray();
    JsonObject& dht22 = json.createNestedObject().createNestedObject(F("dht22"));
    dht22["temperature"] = dhtService.getTemperature();
    dht22["humidity"] = dhtService.getHumidity();
    JsonObject& bmp280 = json.createNestedObject().createNestedObject(F("bmp280"));
    bmp280["temperature"] = bmp280Service.getTemperature();
    bmp280["pressure"] = bmp280Service.getPressure();
    bmp280["altitude"] = bmp280Service.getAltitude();
    JsonObject& mq135 = json.createNestedObject().createNestedObject(F("mq135"));
    mq135["ppm"] = mq135Service.getPPM();
    mq135["CO2"] = mq135Service.getCO2();
    
    SERVER.send(request, json);
  });

  // TODO raise condition causes error?
  SERVER.on("/test", HTTP_GET, [this](AsyncWebServerRequest * request) {

    // pinMode(2, OUTPUT);
    // delay(20);
    // pinMode(2, INPUT_PULLUP);
    
    DynamicJsonBuffer jsonBuffer;
    JsonObject& json = jsonBuffer.createObject();
    
    SERVER.send(request, json);
  });


  SERVER.on("/log", HTTP_GET, [this](AsyncWebServerRequest * request) {
    //request->send(new AsyncBasicResponse(200, "text/plain", esp8266util::LogFile.getLog()));
  });

  // add web socket support
  wsl.onConnect([this](AsyncWebSocket *ws, AsyncWebSocketClient *client, AwsEventType type, AwsFrameInfo *info, uint8_t *data, size_t len) {

    //Log.verbose(F("WS connect received" CR));

    // create reply message
    DynamicJsonBuffer buffer;
    JsonObject& message = buffer.createObject();
    message["clientId"] = client->id();
    message["temperature"] = dhtService.getTemperature();
    message["humidity"] = dhtService.getHumidity();
    message["temperature"] = dhtService.getTemperature();
    message["humidity"] = dhtService.getHumidity();
      
    // send reply message
    uint16_t length = message.measureLength() + 1;
    char payload[length];
    message.printTo(payload, length);
    client->text(payload);
  });
  wsl.onTextMessage([this](AsyncWebSocket *ws, AsyncWebSocketClient *client, AwsEventType type, AwsFrameInfo *info, uint8_t *data, size_t len) {

    //Log.verbose(F("WS request received" CR));

    // create reply message
    DynamicJsonBuffer buffer;
    JsonObject& message = buffer.createObject();
    message["clientId"] = client->id();
    message["temperature"] = dhtService.getTemperature();
    message["humidity"] = dhtService.getHumidity();
      
    // send reply message
    uint16_t length = message.measureLength() + 1;
    char payload[length];
    message.printTo(payload, length);
    client->text(payload);
  });
  // add web socket
  AsyncWebSocket* webSocket = new AsyncWebSocket("/temperature");
  webSocket->onEvent([this](AsyncWebSocket *ws, AsyncWebSocketClient *client, AwsEventType type, void *arg, uint8_t *data, size_t len) {
    wsl.onEvent(ws, client, type, arg, data, len);
  });
  SERVER.getWebServer().addHandler(webSocket);
  
  Log.verbose(F("=========================" CR));
  Log.verbose(F("Setup finished. Have fun." CR));
  Log.verbose(F("=========================" CR));
}

void Esp8266::run() {

  if (SYSTEM.nextLoopInterval()) {

    MDNS_SERVICE.getMDNSResponder().update();

    //bmp280Service.update();
    //dhtService.update();
    //mq135Service.update();

    // broadcast?
    //Log.verbose(F("Temperature: 22" CR));
    //webSocket->textAll("Temperature: 22");

    //Log.verbose(F("Temperature: %D" CR), dhtService.getTemperature());
    //Log.verbose(F("Humidity: %D" CR), dhtService.getHumidity());

    char buffer[200];
    sprintf(buffer, "TIME : %s", NTP_SERVICE.getNTPClient().getTimeDateString().c_str());
    //logService.write(buffer, true);
  }
}

