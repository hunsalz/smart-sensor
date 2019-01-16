#define USE_ESP_ASYNC

#include <ESP8266mDNS.h>        // https://github.com/esp8266/Arduino/blob/master/libraries/ESP8266mDNS/src/ESP8266mDNS.h
#include <ESP8266WiFiMulti.h>   // https://github.com/esp8266/Arduino/tree/master/libraries/ESP8266WiFi/src/ESP8266WiFiMulti.h
#include <StreamString.h>       // https://github.com/esp8266/Arduino/blob/master/cores/esp8266/StreamString.h

#include <Esp8266Utils.h>       // https://github.com/hunsalz/esp8266utils

#include "config.h"

using namespace esp8266utils;

ESPAsyncWebService webService(80);
BME280Sensor bme280;

unsigned long nextLoopInterval = 0;

void setup() {

  // init Serial with desired baud rate
  Logging::init(115200);
  VERBOSE_FP(F("Serial baud rate is [%lu]"), Serial.baudRate());

  // WiFi setup
  ESP8266WiFiMulti wifiMulti;
  wifiMulti.addAP(WIFI_SSID_1, WIFI_PSK_1);
  wifiMulti.addAP(WIFI_SSID_2, WIFI_PSK_2);
  setupWiFiSta(wifiMulti);

  // WiFi AP setup
  setupWiFiAp(WIFI_AP_SSID, WIFI_AP_PSK);

  // MDNS setup
  const char* hostname = "esp8266";
  if (MDNS.begin(hostname)) {
    // add service to MDNS-SD
    MDNS.addService("http", "tcp", 80);
    VERBOSE_FP(F("MDNS enabled to http://%s.local"), hostname);
  } else {
     ERROR_FP(F("MDNS failed for http://%s.local"), hostname);
  }

  // sensor setup
  if (bme280.begin(0x76)) {
    VERBOSE_FP(F("BME280 is ready."));
  } else {
    ERROR_FP(F("Setup BME280 failed!"));
  }

  // file system setup to enable static web server content
  FileSystem fs; 
  fs.begin();

  // general web server setup
  webService.begin();
  // rewrite root context
  webService.getWebServer().rewrite("/", "/index.html");
  // handle static web resources
  webService.getWebServer().serveStatic("/", SPIFFS, "/www/", "max-age:15");
  
  // add dynamic http resources
  webService.on("/fs", HTTP_GET, [&fs](AsyncWebServerRequest* request) {

    AsyncResponseStream *response = request->beginResponseStream("application/json");  
    StreamString* payload = new StreamString();
    size_t size = fs.serializeInfo(*payload);
    response->print(*payload); 
    request->send(response);
    VERBOSE(*payload);
    delete payload;
  });
  webService.on("/files", HTTP_GET, [&fs](AsyncWebServerRequest* request) {

    AsyncResponseStream *response = request->beginResponseStream("application/json");  
    StreamString* payload = new StreamString();
    size_t size = fs.serializeListing(*payload);
    response->print(*payload); 
    request->send(response);
    VERBOSE(*payload);
    delete payload;
  });
  webService.on("/sta", HTTP_GET, [](AsyncWebServerRequest* request) {

    AsyncResponseStream *response = request->beginResponseStream("application/json");  
    StreamString* payload = new StreamString();
    size_t size = serializeWiFiSta(*payload);
    response->print(*payload); 
    request->send(response);
    VERBOSE(*payload);
    delete payload;
  });
  webService.on("/esp", HTTP_GET, [](AsyncWebServerRequest* request) {
    
    AsyncResponseStream *response = request->beginResponseStream("application/json");  
    StreamString* payload = new StreamString();
    size_t size = serializeESP(*payload);
    response->print(*payload); 
    request->send(response);
    VERBOSE(*payload);
    delete payload;
  });
  webService.on("/bme280", HTTP_GET, [](AsyncWebServerRequest* request) {

    AsyncResponseStream *response = request->beginResponseStream("application/json");  
    StreamString* payload = new StreamString();
    size_t size = bme280.serialize(*payload);
    response->print(*payload); 
    request->send(response);
    VERBOSE(*payload);
    delete payload;
  });

  VERBOSE_FP(F("========================="));
  VERBOSE_FP(F("Setup finished. Have fun."));
  VERBOSE_FP(F("========================="));
}

void loop() {

  if (millis() > nextLoopInterval) {  
    nextLoopInterval = millis() + LOOP_INTERVAL;
    
    MDNS.update();

    // read sensor values
    bme280.update(USE_MOCK_DATA);
    // serialize sensor data
    StreamString* payload = new StreamString();
    bme280.serialize(*payload);
    VERBOSE(*payload);
    delete payload;
  }

  // reserve time for core processes
  delay(500);
}
