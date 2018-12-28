#include <ESP8266HTTPClient.h> // https://github.com/esp8266/Arduino
#include <Esp8266Utils.h>      // https://github.com/hunsalz/esp8266utils

#include "config.h"

void setup() {

  // init Serial with desired baud rate
  esp8266utils::Logging::init(115200);
  VERBOSE_MSG_P(F("Serial baud rate is %lu"), Serial.baudRate());

  // WiFi setup
  WIFI_STA_CFG.addAP(WIFI_SSID_1, WIFI_PSK_1);
  WIFI_STA_CFG.addAP(WIFI_SSID_2, WIFI_PSK_2);
  WIFI_STA_CFG.begin();

  // sensor setup
  esp8266utils::BMP280Sensor bmp280;
  if (bmp280.begin(0x76, BMP280_CHIPID, DEVICE)) {
    VERBOSE_MSG_P(F("BMP280 is ready for %s"), DEVICE);
    // read sensor data
    bmp280.update(USE_MOCK_DATA);
    // push sensor data
    push("bmp280", bmp280.getValuesAsJson());
  } else {
    ERROR_MSG_P(F("Setup BMP280 failed!"));
  }

  // deep sleep mode
  VERBOSE_MSG("Going into deep sleep for the next %lu seconds.", (unsigned long)(DEEP_SLEEP_INTERVAL / 1e6));
  ESP.deepSleep(DEEP_SLEEP_INTERVAL);
}

void push(const char *name, String json) {

  VERBOSE_MSG_P(F("Push value|%s|%s"), name, json.c_str());
  
  HTTPClient http;
  http.begin((String)"http://" + PARSE_SERVER + "/classes/BMP280");
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
