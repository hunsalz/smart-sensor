#include <Esp8266Utils.h>     // https://github.com/hunsalz/esp8266utils
#include <Log4Esp.h>          // https://github.com/hunsalz/log4Esp

#include "config.h"

// web server settings
const static int PORT = 80;

esp8266utils::BME280Sensor bme280;

void setup() {

  // init Serial with desired baud rate
  esp8266utils::Logging::init(115200);
  VERBOSE_MSG_P(F("Serial baud rate is [%lu]"), Serial.baudRate());

  // WiFi setup
  WIFI_STA_CFG.addAP(WIFI_SSID_1, WIFI_PSK_1);
  WIFI_STA_CFG.addAP(WIFI_SSID_2, WIFI_PSK_2);
  WIFI_STA_CFG.begin();

  // sensor setup
  if (bme280.begin(0x76)) {
    VERBOSE_MSG_P(F("BME280 is ready."));
  } else {
    ERROR_MSG_P(F("Setup BME280 failed!"));
  }

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
  SERVER.on("/bme280", HTTP_GET, [](AsyncWebServerRequest* request) {
    SERVER.send(request, esp8266utils::APP_JSON, bme280.getValuesAsJson());
  });

  VERBOSE_MSG_P(F("========================="));
  VERBOSE_MSG_P(F("Setup finished. Have fun."));
  VERBOSE_MSG_P(F("========================="));
}

void loop() {
  
  if (SYS_CFG.nextLoopInterval()) {
       
    MDNS.update();

    bme280.update(USE_MOCK_DATA);
    VERBOSE_MSG_P(F("Set value|%s|%s"), "BME280", bme280.getValuesAsJson().c_str());
  }

  // reserve time for core processes
  delay(500);
}
