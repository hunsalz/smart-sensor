#include <ESP8266HTTPClient.h> // https://github.com/esp8266/Arduino
#include <Esp8266Utils.h>      // https://github.com/hunsalz/esp8266utils
#include <Log4Esp.h>           // https://github.com/hunsalz/log4Esp

#include "config.h"

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

  // WiFi setup
  WIFI_STA_CFG.addAP(WIFI_SSID_1, WIFI_PSK_1);
  WIFI_STA_CFG.addAP(WIFI_SSID_2, WIFI_PSK_2);
  WIFI_STA_CFG.begin();

  // save current ESP settings
  set("esp", SYS_CFG.getDetails());

  // sensor setup
  esp8266utils::BME680Sensor bme680;
  if (bme680.begin(0x76)) {
    LOG.verbose(F("BME680 is ready."));
    // read sensor data
    bme680.update(USE_MOCK_DATA);
    // push sensor data
    push("bme680", bme680.getValuesAsJson());
  } else {
    LOG.error(F("Setup BME680 failed!"));
  }

  // deep sleep mode
  LOG.verbose("Going into deep sleep for the next %lu seconds.", (unsigned long)(DEEP_SLEEP_INTERVAL / 1e6));
  ESP.deepSleep(DEEP_SLEEP_INTERVAL);
}

void set(const char *name, String json) {
  
  LOG.verbose(F("Set value|%s|%s"), name, json.c_str());

  // TODO
}

void push(const char *name, String json) {

  LOG.verbose(F("Push value|%s|%s"), name, json.c_str());
  
  HTTPClient http;
  http.begin((String)"http://" + PARSE_SERVER + "/classes/BME680");
  http.addHeader("X-Parse-Application-Id", PARSE_APPLICATION_ID);
  http.addHeader("X-Parse-REST-API-Key", PARSE_REST_API_KEY);
  http.addHeader("X-Parse-Session-Token", PARSE_SESSION);
  http.addHeader("Content-Type", "application/json");
  int httpCode = http.POST(json);
  http.end();
}

void loop() {
  // nothing to do, unless ESP deep sleep is disabled
}