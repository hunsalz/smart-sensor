#include "Esp8266.h"

void Esp8266::begin() {
  LOG.verbose(F("Setup ESP8266 ..."));
  // setup hardware components
  _bmp280.begin();
  _dht22.begin(2, 22);
  _mq135.begin(A0);
  // setup WIFi station
  WIFI_STA_CFG.addAP(WIFI_SSID_1, WIFI_PASSWD_1);
  WIFI_STA_CFG.addAP(WIFI_SSID_2, WIFI_PASSWD_2);
  WIFI_STA_CFG.begin();
  // setup WiFi access point
  WIFI_AP_CFG.begin(WIFI_AP_SSID, WIFI_AP_PASSWD);
  // setup MDNS
  MDNS_CFG.begin("esp8266");
  MDNS.addService("http", "tcp", PORT);
  // init file system to handle static web resources
  FILESYSTEM.begin();
  // setup web server
  SERVER.begin(PORT);
  // rewrite root context˘˘
  SERVER.getWebServer().rewrite("/", "/index.build.html");
  // handle static web resources
  SERVER.getWebServer().serveStatic("/", SPIFFS, "/www/",
                                    "max-age:15");  // cache-control 15 seconds
  // add dynamic http resources
  SERVER.on("/fs", HTTP_GET, [this](AsyncWebServerRequest *request) {
    SERVER.send(request, FILESYSTEM.getStorageDetails());
  });
  SERVER.on("/files", HTTP_GET, [this](AsyncWebServerRequest *request) {
    SERVER.send(request, FILESYSTEM.getFileListing());
  });
  SERVER.on("/sta", HTTP_GET, [this](AsyncWebServerRequest *request) {
    SERVER.send(request, WIFI_STA_CFG.getDetails());
  });
  SERVER.on("/ap", HTTP_GET, [this](AsyncWebServerRequest *request) {
    SERVER.send(request, WIFI_AP_CFG.getDetails());
  });
  SERVER.on("/sensor", HTTP_GET, [this](AsyncWebServerRequest *request) {
    SERVER.send(request, getLastSensorValues());
  });
  SERVER.on("/bmp280", HTTP_GET, [this](AsyncWebServerRequest *request) {
    SERVER.send(request, _bmp280.getJsonValue());
  });
  SERVER.on("/dht22", HTTP_GET, [this](AsyncWebServerRequest *request) {
    SERVER.send(request, _dht22.getJsonValue());
  });
  SERVER.on("/mq135", HTTP_GET, [this](AsyncWebServerRequest *request) {
    SERVER.send(request, _mq135.getJsonValue());
  });
  // setup loop interval
  SYS_CFG.setLoopInterval(2000);
  // setup Firebase connection
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  // setup logger settings
  //_logger.getAppender().push_back(new RollingFileAppender(LOG_FILENAME, 40,
  // 1024, true));
  LOG.addLevelToAll(Appender::VERBOSE);

  LOG.addFormatterToAll([](Print &output, Appender::Level level, const char *msg, va_list *args) {

    // output log level
    output.print(Appender::toString(level, true));
    output.print(Appender::DEFAULT_SEPARATOR);
    // output uptime of this program in milliseconds
    output.print(millis());
    output.print(Appender::DEFAULT_SEPARATOR);
    // output free heap space
    output.print(ESP.getFreeHeap());
    output.print(Appender::DEFAULT_SEPARATOR);
    // determine buffer length for formatted data
    size_t length = vsnprintf(NULL, 0, msg, *args) + 1;
    char buffer[length];
    // output formatted data
    vsnprintf(buffer, length, msg, *args);
    output.print(buffer);
  });


  LOG.verbose(F("========================="));
  LOG.verbose(F("Setup finished. Have fun."));
  LOG.verbose(F("========================="));
}

void Esp8266::run() {
  if (SYS_CFG.nextLoopInterval()) {
    MDNS.update();

    // update sensors
    _bmp280.update();
    _dht22.update();
    _mq135.update();

    Firebase.set("BMP280", JsonVariant(_bmp280.getJsonValue()));

    // Firebase.setFloat("BMP280_Temperature", _bmp280.getTemperature());
    // Firebase.setFloat("BMP280_Pressure", _bmp280.getPressure());
    // Firebase.setFloat("BMP280_Altitude", _bmp280.getAltitude());

    // handle error
    if (Firebase.failed()) {
      // TODO log error code
      _logger.error(F("Saving BMP280 temperature failed."));
    } else {
      _logger.verbose(F("BMP280 Temperature|%.2f"), _bmp280.getTemperature());
    }

    // Firebase.setFloat("DHT22_Temperature", _dht22.getTemperature());
    // Firebase.setFloat("DHT22_Humidity", _dht22.getHumidity());

    // Firebase.setFloat("MQ135_PPM", _mq135.getPPM());
    // Firebase.setFloat("MQ135_CO2", _mq135.getCO2());

    LOG.verbose(esp8266util::toString(_bmp280.getJsonValue()));
    LOG.verbose(esp8266util::toString(_dht22.getJsonValue()));
    LOG.verbose(esp8266util::toString(_mq135.getJsonValue()));

    // _mqttService.publish("weather-station", getLastSensorValues());

    // SYS_CFG.deepSleep();
  }
}

JsonArray &Esp8266::getLastSensorValues() {
  
  // TODO - FIXME
  DynamicJsonBuffer jsonBuffer;
  JsonArray &json = jsonBuffer.createArray();
  json.add(_bmp280.getJsonValue());
  json.add(_dht22.getJsonValue());
  json.add(_mq135.getJsonValue());

  return json;
}