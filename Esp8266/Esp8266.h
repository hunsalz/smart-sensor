#pragma once

#include <Arduino.h> // https://github.com/esp8266/Arduino/tree/master/cores/esp8266
#include <ArduinoJson.h> // https://github.com/bblanchon/ArduinoJson

#include <Log4Esp.h> // https://github.com/hunsalz/log4Esp
#include <Esp8266Utils.h> // https://github.com/hunsalz/esp8266utils

using log4Esp::LOG;
using log4Esp::Logger;
using log4Esp::RollingFileAppender;
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

class Esp8266 {

  public:

    void begin();

    void run();

  private: 

    // WiFi settings
    const char* WIFI_SSID_1 = "Sputnik";
    const char* WIFI_PASSWD_1 = "!--Sputnik--!";
    const char* WIFI_SSID_2 = "visitors";
    const char* WIFI_PASSWD_2 = "kA!3MD.kE-92BVtx";

    const char* WIFI_AP_SSID = "MyESP8266";
    const char* WIFI_AP_PASSWD = "password";

    // web server settings
    const static int PORT = 80;

    // MQTT settings
    const char* MQTT_USER = "esp8266";
    const char* MQTT_PASSWD = "G}L39C+7p?#Q#E";

    // file logger
    const char* LOG_FILENAME = "/www/sensor.log";
    Logger _logger;

    esp8266util::BMP280Service bmp280Service;
    esp8266util::DHTService dhtService;
    esp8266util::MQ135Service mq135Service;
    esp8266util::MQTTService mqttService;
    esp8266util::WebSocketListener wsl;

    JsonArray& getLastSensorValues();
};
