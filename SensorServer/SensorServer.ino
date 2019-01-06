#include <ESP8266HTTPClient.h>  // https://github.com/esp8266/Arduino
#include <ESP8266WiFiMulti.h>   // https://github.com/esp8266/Arduino/tree/master/libraries/ESP8266WiFi/src/ESP8266WiFiMulti.h
#include <StreamString.h>       // https://github.com/esp8266/Arduino/blob/master/cores/esp8266/StreamString.h

#include <Esp8266Utils.h>       // https://github.com/hunsalz/esp8266utils

#include "config.h"

esp8266utils::BME280Sensor bme280;

unsigned long next = 0;

void setup() {

  // init Serial with desired baud rate
  esp8266utils::Logging::init(115200);
  VERBOSE_FP(F("Serial baud rate is [%lu]"), Serial.baudRate());

  // WiFi setup
  ESP8266WiFiMulti wifiMulti;
  wifiMulti.addAP(WIFI_SSID_1, WIFI_PSK_1);
  wifiMulti.addAP(WIFI_SSID_2, WIFI_PSK_2);
  esp8266utils::setupWiFiSta(wifiMulti);

  // sensor setup
  if (bme280.begin(0x76)) {
    VERBOSE_FP(F("BME280 is ready for %s"), bme280.getDeviceName());
  } else {
    ERROR_FP(F("Setup BME280 failed!"));
  }

  // MDNS setup
  //MDNS_CFG.begin("esp8266");
  //MDNS.addService("http", "tcp", PORT);

  // file system setup to enable static web server content
  esp8266utils::FileSystem fs; 
  fs.begin();

  // web server setup
  esp8266utils::WebService webService(80);
  webService.begin();
  // rewrite root context
  webService.getWebServer().rewrite("/", "/index.html");
  // handle static web resources
  webService.getWebServer().serveStatic("/", SPIFFS, "/www/", "max-age:15");
  // cache-control 15 seconds
  // add dynamic http resources
  webService.on("/fs", HTTP_GET, [&fs](AsyncWebServerRequest* request) {

    AsyncResponseStream *response = request->beginResponseStream("application/json");  
    StreamString* payload = new StreamString();
    size_t size = fs.serializeInfo(*payload);
    response->print(*payload); 
    request->send(response);
    delete payload;
  });
  webService.on("/files", HTTP_GET, [&fs](AsyncWebServerRequest* request) {

    AsyncResponseStream *response = request->beginResponseStream("application/json");  
    StreamString* payload = new StreamString();
    size_t size = fs.serializeListing(*payload);
    response->print(*payload); 
    request->send(response);
    delete payload;
  });
  webService.on("/sta", HTTP_GET, [](AsyncWebServerRequest* request) {

    AsyncResponseStream *response = request->beginResponseStream("application/json");  
    StreamString* payload = new StreamString();
    size_t size = esp8266utils::serializeWiFiSta(*payload);
    response->print(*payload); 
    request->send(response);
    delete payload;
  });
  webService.on("/esp", HTTP_GET, [](AsyncWebServerRequest* request) {
    
    AsyncResponseStream *response = request->beginResponseStream("application/json");  
    StreamString* payload = new StreamString();
    size_t size = esp8266utils::serializeESP(*payload);
    response->print(*payload); 
    request->send(response);
    delete payload;
  });
  webService.on("/bme280", HTTP_GET, [](AsyncWebServerRequest* request) {

    AsyncResponseStream *response = request->beginResponseStream("application/json");  
    StreamString* payload = new StreamString();
    size_t size = bme280.serialize(*payload);
    response->print(*payload); 
    request->send(response);
    delete payload;
  });

  VERBOSE_FP(F("========================="));
  VERBOSE_FP(F("Setup finished. Have fun."));
  VERBOSE_FP(F("========================="));
}

StreamString* payload;

void loop() {

  if (millis() > next) {
    
    next = millis() + 5000;
    
    //MDNS.update();

    // read sensor values
    bme280.update(USE_MOCK_DATA);
    // serialize sensor data
    payload = new StreamString();
    bme280.serialize(*payload);
    VERBOSE(*payload);
    delete payload;
  }

  // reserve time for core processes
  delay(500);
}
