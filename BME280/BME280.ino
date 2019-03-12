#ifdef ESP32
  #include <HTTPClient.h>         // https://github.com/espressif/arduino-esp32/blob/master/libraries/HTTPClient/src/HTTPClient.h
  #include <WiFiMulti.h>          // https://github.com/espressif/arduino-esp32/blob/master/libraries/WiFi/src/WiFiMulti.h
#else
  #include <ESP8266HTTPClient.h>  // https://github.com/esp8266/Arduino
  #include <ESP8266WiFiMulti.h>   // https://github.com/esp8266/Arduino/tree/master/libraries/ESP8266WiFi/src/ESP8266WiFiMulti.h
#endif

#include <WiFiClientSecure.h>     // https://github.com/esp8266/Arduino/blob/master/libraries/ESP8266WiFi/src/WiFiClientSecure.h
#include <StreamString.h>         // https://github.com/espressif/arduino-esp32/blob/master/cores/esp32/StreamString.h
                                  // https://github.com/esp8266/Arduino/blob/master/cores/esp8266/StreamString.h
#include <ArduinoJson.h>          // https://github.com/bblanchon/ArduinoJson

#include <EspUtils.h>             // https://github.com/hunsalz/EspUtils

#include "config.h"

using namespace espUtils;

#ifdef ESP32
  WiFiMulti wifiMulti;
#else
  ESP8266WiFiMulti wifiMulti;
#endif

void setup() {
  
  // init Serial with appropriate baud rate
  LOGGER(115200);
  VERBOSE_FP(F("Serial baud rate is %lu"), Serial.baudRate());
  // WiFi setup
  wifiMulti.addAP(WIFI_SSID_1, WIFI_PSK_1);
  wifiMulti.addAP(WIFI_SSID_2, WIFI_PSK_2);
  if (!setupWiFiSta(wifiMulti)) {
    // exit with deep sleep mode
    exitWithDeepSleep();
  }

  // try to read sensor data
  BME280Sensor sensor;
  if (!sensor.begin(0x76)) {
    // output and post error to server
    String error = "Setup BME280 failed!";
    ERROR(error);
    StreamString* payload = new StreamString();
    size_t size = serialize(*payload, error);
    post(PARSE_ERROR_URI, (Stream*)payload, size);
    // exit with deep sleep mode
    exitWithDeepSleep();
  }
  VERBOSE_FP(F("BME280 is ready"));
  if (!sensor.update(USE_MOCK_DATA)) {
    // output and post error to server
    String error = "Reading BME280 data failed!";
    ERROR(error);
    StreamString* payload = new StreamString();
    size_t size = serialize(*payload, error);
    post(PARSE_ERROR_URI, (Stream*)payload, size);
    // exit with deep sleep mode
    exitWithDeepSleep();
  }

  // output & post sensor data to server
  StreamString* payload = new StreamString();
  size_t size = sensor.serialize(*payload);
  VERBOSE(*payload);
  post(PARSE_BME280_URI, (Stream*)payload, size);

  // exit with deep sleep mode
  exitWithDeepSleep();
}

void post(const char* uri, Stream* payload, size_t size) {

  // setup appropriate client
  #if defined(INSECURE)
    WARNING_P(F("SSL validation is incative! Use with care."));
    uint16_t port = 80;
    bool https = false;
    WiFiClient client;
  #else 
    VERBOSE_P(F("SSL validation is active"));
    uint16_t port = 443;
    bool https = true;
    #ifdef ESP32
      WiFiClientSecure client;
      client.setCACert(PARSE_PROVIDER_CA_CERT);
    #else 
      BearSSL::WiFiClientSecure client;
      BearSSL::PublicKey key(PARSE_PROVIDER_PUB_KEY);
      client.setKnownKey(&key);
    #endif
  #endif
      
  // use appropriate http timeout
  client.setTimeout(HTTP_TIMEOUT);
      
  // push sensor data
  HTTPClient http;
  if (http.begin(client, PARSE_HOST, port, uri, https)) {
    http.addHeader("X-Parse-Application-Id", PARSE_APPLICATION_ID);
    http.addHeader("X-Parse-REST-API-Key", PARSE_REST_API_KEY);
    http.addHeader("X-Parse-Session-Token", PARSE_SESSION_TOKEN);
    http.addHeader("Content-Type", APPLICATION_JSON);
    int httpCode = http.sendRequest("POST", payload, size);
    if (https) {
      VERBOSE_FP(F("[POST] to https://%s%s returned %d"), PARSE_HOST, uri, httpCode);
    } else {
      VERBOSE_FP(F("[POST] to http://%s%s returned %d"), PARSE_HOST, uri, httpCode);
    }
    http.end();
  } else {
    if (https) {
      ERROR_FP(F("Connceting to https://%s%s failed"), PARSE_HOST, uri);
    } else {
      ERROR_FP(F("Connceting to http://%s%s failed"), PARSE_HOST, uri);
    }
  }
  // clean up
  client.stop();
}

size_t serialize(String& output, String& error) {

  char device[15];
  int size = Sensor::getDevice(device);

  const size_t CAPACITY = JSON_OBJECT_SIZE(2) + 40;
  StaticJsonDocument<CAPACITY> doc;
  JsonObject object = doc.to<JsonObject>();
  object["error"] = error;
  object["device"] = device;
  serializeJson(object, output);
  return measureJson(object);
}

void exitWithDeepSleep() {

  VERBOSE_FP(F("Going into deep sleep for the next %lu seconds."), (unsigned long)(DEEP_SLEEP_INTERVAL / 1e6));
  ESP.deepSleep(DEEP_SLEEP_INTERVAL);
}

void loop() {
  // nothing to do, unless ESP deep sleep is disabled
}
