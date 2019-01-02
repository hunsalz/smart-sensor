#include <ESP8266HTTPClient.h>  // https://github.com/esp8266/Arduino
#include <ESP8266WiFiMulti.h>   // https://github.com/esp8266/Arduino/tree/master/libraries/ESP8266WiFi/src/ESP8266WiFiMulti.h

#include <Esp8266Utils.h>       // https://github.com/hunsalz/esp8266utils

#include "config.h"

void setup() {

  // init Serial with desired baud rate
  esp8266utils::Logging::init(115200);
  VERBOSE_MSG_P(F("Serial baud rate is %lu"), Serial.baudRate());

  // WiFi setup
  ESP8266WiFiMulti wifiMulti;
  wifiMulti.addAP(WIFI_SSID_1, WIFI_PSK_1);
  wifiMulti.addAP(WIFI_SSID_2, WIFI_PSK_2);
  esp8266utils::setupWiFiSta(wifiMulti);

  // sensor setup
  esp8266utils::BMP085Sensor bmp085;
  if (bmp085.begin(0x76)) {
    VERBOSE_MSG_P(F("BMP085 is ready for %s"), bmp085.getDeviceName().c_str());
    // read sensor data
    bmp085.update(USE_MOCK_DATA);
    // push sensor data
    push("bmp085", bmp085.getValuesAsJson());
  } else {
    ERROR_MSG_P(F("Setup BMP085 failed!"));
  }

  // deep sleep mode
  VERBOSE_MSG_P(F("Going into deep sleep for the next %lu seconds."), (unsigned long)(DEEP_SLEEP_INTERVAL / 1e6));
  ESP.deepSleep(DEEP_SLEEP_INTERVAL);
}

void push(const char *name, String json) {

  VERBOSE_MSG_P(F("Push value|%s|%s"), name, json.c_str());
  
  HTTPClient http;
  http.begin((String)"http://" + PARSE_SERVER + "/classes/BMP085");
  http.addHeader("X-Parse-Application-Id", PARSE_APPLICATION_ID);
  http.addHeader("X-Parse-REST-API-Key", PARSE_REST_API_KEY);
  http.addHeader("X-Parse-Session-Token", PARSE_SESSION_TOKEN);
  http.addHeader("Content-Type", "application/json");
  int httpCode = http.POST(json);
  http.end();
}

void loop() {
  // nothing to do, unless ESP deep sleep is disabled
}
