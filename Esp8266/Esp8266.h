#pragma once

#include <Arduino.h>         // https://github.com/esp8266/Arduino/tree/master/cores/esp8266
#include <Esp8266Utils.h>    // https://github.com/hunsalz/esp8266utils
#include <FirebaseArduino.h> // https://github.com/firebase/firebase-arduino
#include <Log4Esp.h>         // https://github.com/hunsalz/log4Esp

#include <ArduinoJson.h> // https://github.com/bblanchon/ArduinoJson

using esp8266util::DHTService;
using esp8266util::FILESYSTEM;
using esp8266util::MDNS_SERVICE;
using esp8266util::MQ135Service;
using esp8266util::MQTTService;
using esp8266util::NTP_SERVICE;
using esp8266util::SERVER;
using esp8266util::SYSTEM;
using esp8266util::WIFI_CLIENT;
using esp8266util::WIFI_STATION;
using log4Esp::LOG;
using log4Esp::Logger;
using log4Esp::RollingFileAppender;

class Esp8266 {

public:
  void begin();

  void run();

private:
  // WiFi settings
  const char *WIFI_SSID_1 = "xxx";
  const char *WIFI_PASSWD_1 = "xxx";
  const char *WIFI_SSID_2 = "xxx";
  const char *WIFI_PASSWD_2 = "xxx";

  const char *WIFI_AP_SSID = "MyESP8266";
  const char *WIFI_AP_PASSWD = "password";

  // web server settings
  const static int PORT = 80;

  // Firebase settings
  #define FIREBASE_HOST "xxx"
  #define FIREBASE_AUTH "xxx"

  // MQTT settings
  const char *MQTT_USER = "xxx";
  const char *MQTT_PASSWD = "xxx";

  // file logger
  const char *LOG_FILENAME = "/www/sensor.log";
  Logger _logger;

  esp8266util::BMP280Service _bmp280Service;
  esp8266util::DHTService _dhtService;
  esp8266util::MQ135Service _mq135Service;
  esp8266util::MQTTService _mqttService;
  esp8266util::WebSocketListener _wsl;

  WiFiEventHandler _stationModeGotIPHandler;
  WiFiEventHandler _stationModeDisconnectedHandler;

  WiFiEventHandler _softAPModeStationConnectedHandler;

  JsonArray &getLastSensorValues();
};
