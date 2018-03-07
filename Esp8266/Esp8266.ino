#include <Esp8266Utils.h>     // https://github.com/hunsalz/esp8266utils
#include <FirebaseArduino.h>  // https://github.com/firebase/firebase-arduino
#include <Log4Esp.h>          // https://github.com/hunsalz/log4Esp

#include "config.h"

// web server settings
const static int PORT = 80;

esp8266utils::BMP280Sensor _bmp280;
esp8266utils::DHTSensor _dht22;
esp8266utils::MQ135Sensor _mq135;

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

  // Firebase setup
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

  // increase loop interval
  SYS_CFG.setLoopInterval(LOOP_INTERVAL);

  #ifdef ENABLE_WEBSERVER

  // MDNS setup
  MDNS_CFG.begin("esp8266");
  MDNS.addService("http", "tcp", PORT);

  // file system setup to enable static web server content
  FILESYSTEM.begin();

  // web server setup
  SERVER.begin();
  // rewrite root context
  SERVER.getWebServer().rewrite("/", "/index.build.html");
  // handle static web resources
  SERVER.getWebServer().serveStatic("/", SPIFFS, "/www/", "max-age:15");
  // cache-control 15 seconds
  // add dynamic http resources
  SERVER.on("/fs", HTTP_GET, [](AsyncWebServerRequest* request) {
    SERVER.send(request, esp8266utils::APP_JSON, FILESYSTEM.getStorageDetails());
  });
  SERVER.on("/files", HTTP_GET, [](AsyncWebServerRequest* request) {
    SERVER.send(request, esp8266utils::APP_JSON, FILESYSTEM.getFileListing());
  });
  SERVER.on("/sta", HTTP_GET, [](AsyncWebServerRequest* request) {
    SERVER.send(request, esp8266utils::APP_JSON, WIFI_STA_CFG.getDetails());
  });
  SERVER.on("/esp", HTTP_GET, [](AsyncWebServerRequest* request) {
    SERVER.send(request, esp8266utils::APP_JSON, SYS_CFG.getDetails());
  });
  SERVER.on("/bmp280", HTTP_GET, [](AsyncWebServerRequest* request) {
    SERVER.send(request, esp8266utils::APP_JSON, _bmp280.getValuesAsJson());
  });
  SERVER.on("/dht22", HTTP_GET, [](AsyncWebServerRequest* request) {
    SERVER.send(request, esp8266utils::APP_JSON, _dht22.getValuesAsJson());
  });
  SERVER.on("/mq135", HTTP_GET, [](AsyncWebServerRequest* request) {
    SERVER.send(request, esp8266utils::APP_JSON, _mq135.getValuesAsJson());
  });

  #endif // NO_WEBSERVER

  // save current ESP settings to Firebase
  set("esp", SYS_CFG.getDetails());

  LOG.verbose(F("========================="));
  LOG.verbose(F("Setup finished. Have fun."));
  LOG.verbose(F("========================="));
}

void set(const char *name, String json) {
  
  LOG.verbose(F("Set value|%s|%s"), name, json.c_str());
  Firebase.setRawJson(name, json);
  if (Firebase.failed()) {
    LOG.error(F("Saving %s value to Firebase failed: Reason: %s"), name, Firebase.error().c_str());
  }
}

void push(const char *name, String json) {
  
  LOG.verbose(F("Push value|%s|%s"), name, json.c_str());
  // Firebase.pushRawJson(name, json);
  // if (Firebase.failed()) {
  //   LOG.error(F("Saving %s value to Firebase failed: Reason: %s"), name, Firebase.error().c_str());
  // }
}

void loop() {
  
  ESP.wdtDisable();
  if (SYS_CFG.nextLoopInterval()) {
       
    #ifdef ENABLE_WEBSERVER
    MDNS.update();
    #endif // NO_WEBSERVER

    _bmp280.update(USE_MOCK_DATA);
    _dht22.update(USE_MOCK_DATA);
    _mq135.update(USE_MOCK_DATA);

    // // push sensor values to Firebase
    push("bmp280", _bmp280.getValuesAsJson());
    push("dht22", _dht22.getValuesAsJson());
    push("mq135", _mq135.getValuesAsJson());
  }
  ESP.wdtEnable(30000);
  // reserve time for core processes
  delay(500);
}