#include <ESP8266HTTPClient.h>  // https://github.com/esp8266/Arduino
#include <Esp8266Utils.h>       // https://github.com/hunsalz/esp8266utils

#include "config.h"

void setup() {
  // serial setup
  Serial.begin(115200);
  Serial.setDebugOutput(false);
  while (!Serial && !Serial.available()) {
  };
  Serial.println();

  // WiFi setup
  WIFI_STA_CFG.addAP(WIFI_SSID_1, WIFI_PSK_1);
  WIFI_STA_CFG.addAP(WIFI_SSID_2, WIFI_PSK_2);
  WIFI_STA_CFG.begin();

  // save current ESP settings
  set("esp", SYS_CFG.getDetails());

  // sensor setup
  esp8266utils::BME280Sensor bme280;
  if (bme280.begin(0x76, DEVICE)) {
    VERBOSE_MSG("BME280 is ready for %s", DEVICE);
    // read sensor data
    bme280.update(USE_MOCK_DATA);
    // push sensor data
    push("bme280", bme280.getValuesAsJson());
  } else {
    ERROR_MSG("Setup BME280 failed!");
  }

  // deep sleep mode
  VERBOSE_MSG("Going into deep sleep for the next %lu seconds.", (unsigned long)(DEEP_SLEEP_INTERVAL / 1e6));
  ESP.deepSleep(DEEP_SLEEP_INTERVAL);
}

void set(const char *name, String json) {
  
  VERBOSE_MSG("Set value|%s|%s", name, json.c_str());

  // TODO
}

void push(const char *name, String json) {
  
  VERBOSE_MSG("Push value|%s|%s", name, json.c_str());
  HTTPClient http;
  http.begin((String) "http://" + PARSE_SERVER + "/classes/BME280");
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
