/**
 * A WiFi weather station
 */

/**
 * Include contains all configurable properties.
 * You miss a config.h file? Enter your configuration into config.h.template and rename it.
 */
#include "config.h"

/**
 * ESP8266 WiFi settings
 */
#include <ESP8266WiFi.h> // https://github.com/esp8266/Arduino
#include <ESP8266WiFiMulti.h> // https://github.com/esp8266/Arduino
#include <ESP8266mDNS.h> // https://github.com/esp8266/Arduino

ESP8266WiFiMulti wifiMulti;
WiFiClient wifiClient;

/**
 * MQTT settings
 */
#include <PubSubClient.h> // https://github.com/knolleary/pubsubclient

PubSubClient mqttClient;
long lastReconnectAttempt = 0;

/**
 * NTP dependency
 */
#include <NTPClient.h> // https://github.com/arduino-libraries/NTPClient

WiFiUDP ntpUDP;
NTPClient ntpClient(ntpUDP, NTP_SERVER, 0, 60000);

/**
 * JSON dependency
 */
#include <ArduinoJson.h> // https://github.com/bblanchon/ArduinoJson

/**
 * DHT sensor settings
 */
#include <DHT.h> // https://github.com/adafruit/DHT-sensor-library

DHT dhtSensor(DHTPIN, DHTTYPE);

#include <MQ135.h> // https://github.com/GeorgK/MQ135 - Set up sensor for the first time? https://hackaday.io/project/3475-sniffing-trinket/log/12363-mq135-arduino-library

MQ135 gasSensor = MQ135(A0);

#include <Adafruit_BMP280.h> // https://github.com/adafruit/Adafruit_BMP280_Library

Adafruit_BMP280 bmpSensor;

/**
 * setup all
 */
void setup() {

  // set up serial communication channel in DEBUG mode
  Serial.begin(115200);
  Serial.setDebugOutput(true);
  while (!Serial) {
    // wait for serial port initialization
  }
  // setup WiFi
  setupWiFi();
  // setup MQTT
  setupMQTTBroker();
  // setup NTP
  setupNTP();
  // setup various sensors
  dhtSensor.begin();
  // Wire.begin(4,5); // (D2)SDA=4 (D1)SCL=5 #changed directly in Adafruit_BMP280.cpp, because my sensor define a different BMP280_ADDRESS = (0x76)
  if (!bmpSensor.begin()) {  
    DEBUG_MSG("Couldn't find a valid BMP280 sensor.\n");  
  }
}

/**
 * setup WiFi
 */
void setupWiFi() {

  // add access point configurations
  wifiMulti.addAP(WIFI_SSID_1, WIFI_PASSWD_1);
  wifiMulti.addAP(WIFI_SSID_2, WIFI_PASSWD_2);
  // try to connect to WiFi
  DEBUG_MSG("Trying to connect WiFi ");
  uint8_t i = 0;
  while (wifiMulti.run() != WL_CONNECTED && i++ < 20) { // retry 20 times = 10 seconds
    delay(500);
    DEBUG_MSG(".");
  }
  DEBUG_MSG("\n");
  if (i > 20) {
    DEBUG_MSG("Could not connect to any WiFi. Please check your WiFi availability / accessibility and restart.\n");
    while (1) delay(500);
  }
  DEBUG_MSG("WiFi successful connected. IP address is: %s\n", WiFi.localIP().toString().c_str());
  // add <domain name>.local (mDNS)
  if (MDNS.begin(MDNS_NAME)) {
    DEBUG_MSG("Open [http://%s.local] to see status page.\n", MDNS_NAME);
  } else {
    DEBUG_MSG("Couldn't set up [http://%s.local] to see status page.\n", MDNS_NAME);
  }
}

/**
   setup MQTT broker
*/
void setupMQTTBroker() {

  mqttClient.setClient(wifiClient);
  mqttClient.setServer(MQTT_SERVER, MQTT_PORT);
}

/**
 * setup NTP
 */
void setupNTP() {
  ntpClient.begin();
}

/**
   connect to MQTT broker
*/
boolean connect2MQTTBroker() {

  DEBUG_MSG("Trying to connect MQTT broker to %s:%d \n", MQTT_SERVER, MQTT_PORT);
  // attempt to connect
  if (mqttClient.connect(MQTT_CLIENT, MQTT_USERNAME, MQTT_PASSWD)) {
    DEBUG_MSG("Connected successful to MQTT broker.\n");
  } else {
    int state = mqttClient.state();
    // map failure codes - unfortunately not mapped by http://pubsubclient.knolleary.net/api.html itself
    char* msg;
    switch (state) {
      case -4:
        msg = "MQTT_CONNECTION_TIMEOUT - the server didn't respond within the keepalive time";
        break;
      case -3:
        msg = "MQTT_CONNECTION_LOST - the network connection was broken";
        break;
      case -2:
        msg = "MQTT_CONNECT_FAILED - the network connection failed";
        break;
      case -1:
        msg = "MQTT_DISCONNECTED - the client is disconnected cleanly";
        break;
      case 1:
        msg = "MQTT_CONNECT_BAD_PROTOCOL - the server doesn't support the requested version of MQTT";
        break;
      case 2:
        msg = "MQTT_CONNECT_BAD_CLIENT_ID - the server rejected the client identifier";
        break;
      case 3:
        msg = "MQTT_CONNECT_UNAVAILABLE - the server was unable to accept the connection";
        break;
      case 4:
        msg = "MQTT_CONNECT_BAD_CREDENTIALS - the username/password were rejected";
        break;
      case 5:
        msg = "MQTT_CONNECT_UNAUTHORIZED - the client was not authorized to connect";
        break;
      default:
        msg = "MQTT_UNKNOWN_EXCEPTION - exception unknown";
        break;
    }
    DEBUG_MSG("Connection to MQTT broker failed. Error state is %d; Caused by: %s\n", state, msg);
  }
  return mqttClient.connected();
}

/**
   push message to MQTT broker
*/
void pushMessage(char* topic, JsonObject& json) {

  // add UTC timestamp to message
  if (!ntpClient.update()) {
    DEBUG_MSG("Updating NTP failed.\n");
  }
  json["timestamp"] = ntpClient.getEpochTime();
  // convert JSON into char array containing payload
  int len = json.measureLength() + 1;
  char payload[len];
  json.printTo(payload, len);
  DEBUG_MSG("Payload: %s\n", payload);
  // send message
  if (mqttClient.publish(topic, payload, true)) {
    DEBUG_MSG("Sending message to topic [%s] was successful.\n", topic);
  } else {
    DEBUG_MSG("Sending message to topic [%s] failed.\n", topic);
  }
}

/**
 * publish DHT data
 */
void publishDHTData() {

  // read humidity
  float humidity = dhtSensor.readHumidity();
  // read temperature as Celsius (the default)
  float celsius = dhtSensor.readTemperature();
  // read temperature as Fahrenheit (isFahrenheit = true)
  float fahrenheit = dhtSensor.readTemperature(true);
  // check sensor value validity
  if (isnan(humidity) || isnan(celsius) || isnan(fahrenheit)) {
    DEBUG_MSG("Failed to read DHT sensor data!\n");
    return;
  }
  // create json response
  DynamicJsonBuffer jsonBuffer;
  JsonObject& json = jsonBuffer.createObject();
  json["humidity"] = humidity;
  json["celsius"] = celsius;
  json["fahrenheit"] = fahrenheit;
  // push message to MQTT broker
  pushMessage(MQTT_PUB_TOPIC_DHT22, json);
}

/**
 * publish MQ135 data
 */
void publishMQ135Data() {

  int value = analogRead(MQ135_PIN);
  float rzero = gasSensor.getRZero(); // the specific resistance at atmospheric CO2 level of your sensor
  //float resistance = gasSensor.getResistance();
  float ppm = gasSensor.getPPM(); // parts per million - https://en.wikipedia.org/wiki/Carbon_dioxide_in_Earth%27s_atmosphere
  int scale = ppm * 100;
  String co2 = "0.0" + String(ppm * 100, 0); // calculating CO2 in % assuming that the sensor detects mostly CO2 in normal atmosphere
  // create json response
  DynamicJsonBuffer jsonBuffer;
  JsonObject& json = jsonBuffer.createObject();
  json["analog"] = value;
  json["rzero"] = rzero;
  //json["resistance"] = resistance;
  json["ppm"] = ppm;
  json["co2"] = co2;
  // push message to MQTT broker
  pushMessage(MQTT_PUB_TOPIC_MQ135, json);
}

/**
 * publish BMP280 data
 */
void publishBMP280Data() {

  float celsius = bmpSensor.readTemperature();
  float pascal = bmpSensor.readPressure(); // value is Pascal (Pa) - https://en.wikipedia.org/wiki/Pascal_(unit)
  String hPa = String(pascal * 0.001, 0);
  String kPa = String(pascal * 0.0001, 0);
  float altitude = bmpSensor.readAltitude(1013.25); // use standard baseline - https://en.wikipedia.org/wiki/Pressure_altitude
  // create json response
  DynamicJsonBuffer jsonBuffer;
  JsonObject& json = jsonBuffer.createObject();
  json["celsius"] = celsius;
  json["pascal"] = pascal;
  json["hPa"] = hPa;
  json["kPa"] = kPa;
  json["altitude"] = altitude;
  // push message to MQTT broker
  pushMessage(MQTT_PUB_TOPIC_BMP280, json);
}

/**
 * TODO: NOT IMPLEMENTED IN HARDWARE SETUP YET - REASON: NEEDS A SECOND ANALOG INPUT
 * REFERENCE: https://learn.adafruit.com/photocells?view=all
 * 
 * publish photocell data
 */
void publishPhotocellData() {

  //int value = analogRead(PHOTOCELL_PIN); 
  int value = random(200, 250);
  // create json response
  DynamicJsonBuffer jsonBuffer;
  JsonObject& json = jsonBuffer.createObject();
  json["value"] = value;
  // push message to MQTT broker
  pushMessage(MQTT_PUB_TOPIC_PHOTOCELL, json);
}

void loop() {

  if (!mqttClient.connected()) {
    // do a non blocking (re)connect
    long now = millis();
    if (now - lastReconnectAttempt > MQTT_RECONNECT_TIMEOUT) {
      lastReconnectAttempt = now;
      // attempt to connect
      if (connect2MQTTBroker()) {
        lastReconnectAttempt = 0;
      }
    }
  } else {
    // client is connected
    mqttClient.loop();
  }
  // publish sensor data
  publishDHTData();
  publishMQ135Data();
  publishBMP280Data();
  publishPhotocellData();
  // for power savings use deep sleep option; otherwise make a delay
  #ifdef DEEP_SLEEP
    DEBUG_MSG("Fall in deep sleep for %d micro seconds.\n", DEEP_SLEEP);
    ESP.deepSleep(DEEP_SLEEP);
    delay(100); // wait for deep sleep to happen
  #else
    delay(DELAY_TIME);
  #endif
}
