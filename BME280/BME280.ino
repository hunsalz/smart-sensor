#include <ESP8266HTTPClient.h>  // https://github.com/esp8266/Arduino
#include <ESP8266WiFiMulti.h>   // https://github.com/esp8266/Arduino/tree/master/libraries/ESP8266WiFi/src/ESP8266WiFiMulti.h
#include <StreamString.h>       // https://github.com/esp8266/Arduino/blob/master/cores/esp8266/StreamString.h

#include <Esp8266Utils.h>       // https://github.com/hunsalz/esp8266utils

#include <WiFiClientSecure.h>   // TODO

#include "config.h"

void setup() {
  
  // init Serial with desired baud rate
  esp8266utils::Logging::init(115200);
  VERBOSE_FP(F("Serial baud rate is %lu"), Serial.baudRate());

  // WiFi setup
  ESP8266WiFiMulti wifiMulti;
  wifiMulti.addAP(WIFI_SSID_1, WIFI_PSK_1);
  wifiMulti.addAP(WIFI_SSID_2, WIFI_PSK_2);
  esp8266utils::setupWiFiSta(wifiMulti);

  // try to read sensor data
  esp8266utils::BME280Sensor bme280;
  if (bme280.begin(0x76)) {
    VERBOSE_FP(F("BME280 is ready for %s"), bme280.getDeviceName());
    // read sensor data
    bme280.update(USE_MOCK_DATA);
    // serialize sensor data
    StreamString* payload = new StreamString();
    size_t size = bme280.serialize(*payload);
    VERBOSE(*payload);
    // push sensor data
    WiFiClient client;
    HTTPClient http;
    http.begin(client, "http://smart-sensor.back4app.io/classes/BME280");
    http.addHeader("X-Parse-Application-Id", PARSE_APPLICATION_ID);
    http.addHeader("X-Parse-REST-API-Key", PARSE_REST_API_KEY);
    http.addHeader("X-Parse-Session-Token", PARSE_SESSION_TOKEN);
    http.addHeader("Content-Type", "application/json");
    http.sendRequest("POST", payload, size);
    http.end();
  } else {
    ERROR_FP(F("Setup BME280 failed!"));
  }
  
  // go into deep sleep mode
  VERBOSE_FP(F("Going into deep sleep for the next %lu seconds."), (unsigned long)(DEEP_SLEEP_INTERVAL / 1e6));
  ESP.deepSleep(DEEP_SLEEP_INTERVAL);
}

void loop() {
  // nothing to do, unless ESP deep sleep is disabled
}
