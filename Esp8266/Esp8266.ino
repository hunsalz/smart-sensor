#include <Esp8266Utils.h>     // https://github.com/hunsalz/esp8266utils
#include <FirebaseArduino.h>  // https://github.com/firebase/firebase-arduino
#include <Log4Esp.h>          // https://github.com/hunsalz/log4Esp

#include "config.h"

// web server settings
const static int PORT = 80;

esp8266util::BMP280Sensor _bmp280;
esp8266util::DHTSensor _dht22;
esp8266util::MQ135Sensor _mq135;

void setup() {
  // logger setup
  LOG.addLevelToAll(Appender::VERBOSE);
  LOG.addFormatterToAll(
      [](Print &output, Appender::Level level, const char *msg, va_list *args) {
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

  // serial setup
  Serial.begin(115200);
  Serial.setDebugOutput(false);
  while (!Serial && !Serial.available()) {
  };
  Serial.println();
  LOG.verbose(F("Serial baud rate is [%d]"), Serial.baudRate());

  // sensor setup
  _bmp280.begin();
  _dht22.begin(2, 22);
  _mq135.begin(A0);

  // WiFi setup
  WIFI_STA_CFG.addAP(WIFI_SSID_1, WIFI_PSK_1);
  WIFI_STA_CFG.addAP(WIFI_SSID_2, WIFI_PSK_2);
  WIFI_STA_CFG.begin();

  // MDNS setup
  MDNS_CFG.begin("esp8266");
  MDNS.addService("http", "tcp", PORT);

  // Firebase setup
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

  // increase loop interval
  SYS_CFG.setLoopInterval(20000);

  // file system setup
  FILESYSTEM.begin();

  // web server setup
  SERVER.begin();
  // rewrite root context˘˘
  SERVER.getWebServer().rewrite("/", "/index.build.html");
  // handle static web resources
  SERVER.getWebServer().serveStatic("/", SPIFFS, "/www/", "max-age:15");
  // cache-control 15 seconds
  // add dynamic http resources
  SERVER.on("/fs", HTTP_GET, [](AsyncWebServerRequest *request) {
    SERVER.send(request, FILESYSTEM.getStorageDetails());
  });
  SERVER.on("/files", HTTP_GET, [](AsyncWebServerRequest *request) {
    SERVER.send(request, FILESYSTEM.getFileListing());
  });
  SERVER.on("/sta", HTTP_GET, [](AsyncWebServerRequest *request) {
    SERVER.send(request, WIFI_STA_CFG.getDetails());
  });
  SERVER.on("/ap", HTTP_GET, [](AsyncWebServerRequest *request) {
    SERVER.send(request, WIFI_AP_CFG.getDetails());
  });
  SERVER.on("/sensor", HTTP_GET, [](AsyncWebServerRequest *request) {
    //SERVER.send(request, getLastSensorValues());
  });
  SERVER.on("/bmp280", HTTP_GET, [](AsyncWebServerRequest *request) {
    SERVER.send(request, _bmp280.getJsonValue());
  });
  SERVER.on("/dht22", HTTP_GET, [](AsyncWebServerRequest *request) {
    SERVER.send(request, _dht22.getJsonValue());
  });
  SERVER.on("/mq135", HTTP_GET, [](AsyncWebServerRequest *request) {
    SERVER.send(request, _mq135.getJsonValue());
  });

  // TODO error handling
  Firebase.setString("esp", esp8266util::toString(json).c_str());

  LOG.verbose(F("========================="));
  LOG.verbose(F("Setup finished. Have fun."));
  LOG.verbose(F("========================="));
}

void write(const char *name, JsonObject &json) {
  LOG.verbose(F("%s|%s"), name, esp8266util::toString(json).c_str());
  // json["millis"] = millis();
  Firebase.push(name, json);
  if (Firebase.failed()) {
    LOG.error(F("Saving %s values to Firebase failed: Reason: %s"), name, Firebase.error().c_str());
  }
}

void loop() {
  if (SYS_CFG.nextLoopInterval()) {
    MDNS.update();

    _bmp280.update(USE_MOCK_DATA);
    _dht22.update(USE_MOCK_DATA);
    _mq135.update(USE_MOCK_DATA);
    write("bmp280", _bmp280.getJsonValue());
    write("dht22", _dht22.getJsonValue());
    write("mq135", _mq135.getJsonValue());
  }
}
