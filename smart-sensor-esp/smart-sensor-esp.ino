#include <ESP8266mDNS.h>        // https://github.com/esp8266/Arduino/blob/master/libraries/ESP8266mDNS/src/ESP8266mDNS.h
#include <ESP8266WebServer.h>   // https://github.com/esp8266/Arduino/blob/master/libraries/ESP8266WebServer/src/ESP8266WebServer.h
#include <ESP8266WiFiMulti.h>   // https://github.com/esp8266/Arduino/tree/master/libraries/ESP8266WiFi/src/ESP8266WiFiMulti.h
#include <StreamString.h>       // https://github.com/esp8266/Arduino/blob/master/cores/esp8266/StreamString.h

#include <Esp8266Utils.h>       // https://github.com/hunsalz/esp8266utils

#include "config.h"

using namespace esp8266utils;

ESP8266WebServer server(80);
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
  // add service to MDNS
  MDNS.addService("http", "tcp", 80);

  // sensor setup
  if (bme280.begin(0x76)) {
    VERBOSE_FP(F("BME280 is ready."));
  } else {
    ERROR_FP(F("Setup BME280 failed!"));
  }

  // file system setup to enable static web server content
  FileSystem fs; 
  fs.begin();

  // add dynamic http resources
  server.on("/fs", HTTP_GET, [&fs]() {
  
    StreamString* payload = new StreamString();
    size_t size = fs.serializeInfo(*payload);
    server.send(200, APPLICATION_JSON, *payload); 
  });
  server.on("/files", HTTP_GET, [&fs]() {
  
    StreamString* payload = new StreamString();
    size_t size = fs.serializeListing(*payload);
    server.send(200, APPLICATION_JSON, *payload); 
  });
  server.on("/ap", HTTP_GET, []() {
  
    StreamString* payload = new StreamString();
    size_t size = serializeWiFiAp(*payload);
    server.send(200, APPLICATION_JSON, *payload); 
  });
  server.on("/esp", HTTP_GET, []() {
  
    StreamString* payload = new StreamString();
    size_t size = serializeESP(*payload);
    server.send(200, APPLICATION_JSON, *payload); 
  });
  server.on("/bme280", HTTP_GET, []() {
  
    StreamString* payload = new StreamString();
    size_t size = bme280.serialize(*payload);
    server.send(200, APPLICATION_JSON, *payload); 
  });

  // start web server
  server.begin();

  VERBOSE_FP(F("========================="));
  VERBOSE_FP(F("Setup finished. Have fun."));
  VERBOSE_FP(F("========================="));
}

void loop() {

  server.handleClient();

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
  delay(100);
}