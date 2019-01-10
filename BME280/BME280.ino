#include <ESP8266HTTPClient.h>  // https://github.com/esp8266/Arduino
#include <ESP8266WiFiMulti.h>   // https://github.com/esp8266/Arduino/tree/master/libraries/ESP8266WiFi/src/ESP8266WiFiMulti.h
#include <StreamString.h>       // https://github.com/esp8266/Arduino/blob/master/cores/esp8266/StreamString.h
#include <WiFiClientSecure.h>   // https://github.com/esp8266/Arduino/blob/master/libraries/ESP8266WiFi/src/WiFiClientSecure.h

#include <Esp8266Utils.h>       // https://github.com/hunsalz/esp8266utils

#include "config.h"

using namespace esp8266utils;

void setup() {
  
  // init Serial with appropriate baud rate
  LOGGER(115200);
  VERBOSE_FP(F("Serial baud rate is %lu"), Serial.baudRate());

  // WiFi setup
  ESP8266WiFiMulti wifiMulti;
  wifiMulti.addAP(WIFI_SSID_1, WIFI_PSK_1);
  wifiMulti.addAP(WIFI_SSID_2, WIFI_PSK_2);
  setupWiFiSta(wifiMulti);

  // try to read sensor data
  BME280Sensor bme280;
  if (bme280.begin(0x76)) {
    VERBOSE_FP(F("BME280 is ready"));
    // read sensor data
    bme280.update(USE_MOCK_DATA);
    // serialize sensor data
    StreamString* payload = new StreamString();
    size_t size = bme280.serialize(*payload);
    VERBOSE(*payload);
    
    // setup appropriate WiFiClient
    #if defined(INSECURE)
    WARNING_P(F("SSL validation is incative! Use with care."));
    uint16_t port = 80;
    bool https = false;
    WiFiClient client;
    #else
    VERBOSE_P(F("SSL validation is active"));
    uint16_t port = 443;
    bool https = true;
    BearSSL::WiFiClientSecure client;

  static const char pubkey[] PROGMEM = R"KEY(
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnM1nsijQDc8D1uwC5pxx
qCfqSIkgmbNLX1J1Y1q9AdIbNwCMeynjtgEm2ZPfezjPtKnwSNPVzXpc7OJsbF1G
VGynM4JkeUFoupMfHJSlq/FumVUGPxQL+HQbNlafhEXJP1//NAIUMqrWMWrjntvG
hbyUAZQdsNHUTDZ+mNtDO8cQtyKX1B8XktNTLKpbxVevIFaIJnJlRKHso4J4YpK5
2dHjXoEB65gn+7Tc/xzo/FCuthYkFugt4XEpOmNa4IErv0/J1Tzo21wrOo81y66L
YxaSeT4bxQrgT4hhk4Hg6CYSXEz+5MyvgWXhiSRFzoW3mhI6NPR22EjLdH+CGt3z
5QIDAQAB
-----END PUBLIC KEY-----
)KEY";

    BearSSL::PublicKey key(pubkey);
    //BearSSL::PublicKey key(PARSE_PROVIDER_PUB_KEY);
    client.setKnownKey(&key);
    #endif
 
    client.connect(PARSE_HOST, port);
    if (!client.connected()) {
      Serial.printf("*** Can't connect. ***\n-------\n");
      return;
    }
    Serial.printf("Connected!\n-------\n");

    // push sensor data
    HTTPClient http;
    http.setReuse(true);
    http.setTimeout(20000);
    
    //if (http.begin(client, "https://smart-sensor.back4app.io/classes/BME280")) {
    if (http.begin(client, PARSE_HOST, port, PARSE_URI, https)) {
      http.addHeader("X-Parse-Application-Id", PARSE_APPLICATION_ID);
      http.addHeader("X-Parse-REST-API-Key", PARSE_REST_API_KEY);
      http.addHeader("X-Parse-Session-Token", PARSE_SESSION_TOKEN);
      http.addHeader("Content-Type", APPLICATION_JSON);
      http.sendRequest("POST", payload, size);
      http.end();
    }

    // clean up
    client.stop();
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
