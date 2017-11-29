#pragma once

#include <Arduino.h> // https://github.com/esp8266/Arduino/tree/master/cores/esp8266
#include <ArduinoJson.h> // https://github.com/bblanchon/ArduinoJson
#include <ArduinoLog.h> // https://github.com/thijse/Arduino-Log

#include <EspService.h> // https://github.com/hunsalz/esp8266utils/blob/master/src/EspService.h
#include <FSService.h> // https://github.com/hunsalz/esp8266utils/blob/master/src/FSService.h
#include <NTPService.h> // https://github.com/hunsalz/esp8266utils/blob/master/src/NTPService.h
#include <Service.h> // https://github.com/hunsalz/esp8266utils/blob/master/src/Service.h
#include <WebService.h> // https://github.com/hunsalz/esp8266utils/blob/master/src/WebService.h
#include <WebSocketListener.h> // https://github.com/hunsalz/esp8266utils/blob/master/src/WebSocketListener.h

#include <logging/LogService.h> // https://github.com/hunsalz/esp8266utils/blob/master/src/logging/LogService.h
#include <network/MDNSService.h> // https://github.com/hunsalz/esp8266utils/blob/master/src/network/MDNSService.h
#include <network/WiFiAPService.h> // https://github.com/hunsalz/esp8266utils/blob/master/src/network/WiFiAPService.h
#include <network/WiFiService.h> // https://github.com/hunsalz/esp8266utils/blob/master/src/network/WiFiService.h

#include <sensor/BMP280Service.h>
#include <sensor/DHTService.h>
#include <sensor/MQ135Service.h>

using esp8266util::DHTService;
using esp8266util::FILESYSTEM;
using esp8266util::MDNS_SERVICE;
using esp8266util::MQ135Service;
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

    esp8266util::BMP280Service bmp280Service;
    esp8266util::DHTService dhtService;
    esp8266util::MQ135Service mq135Service;
    esp8266util::WebSocketListener wsl;

    // wiFi settings
    const char* WIFI_SSID_1 = "Sputnik";
    const char* WIFI_PASSWD_1 = "!--Sputnik--!";
    const char* WIFI_SSID_2 = "visitors";
    const char* WIFI_PASSWD_2 = "kA!3MD.kE-92BVtx";

    const char* WIFI_AP_SSID = "MyESP8266";
    const char* WIFI_AP_PASSWD = "password";

    // web server settings
    const static int PORT = 80;
};
