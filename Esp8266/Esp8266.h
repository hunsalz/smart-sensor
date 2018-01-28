#ifndef ESP8266_H
#define ESP8266_H

#include <Arduino.h>  // https://github.com/esp8266/Arduino/tree/master/cores/esp8266
#include <ArduinoJson.h>      // https://github.com/bblanchon/ArduinoJson
#include <Esp8266Utils.h>     // https://github.com/hunsalz/esp8266utils
#include <FirebaseArduino.h>  // https://github.com/firebase/firebase-arduino
#include <Log4Esp.h>          // https://github.com/hunsalz/log4Esp

using namespace esp8266util;

class Esp8266 {
 public:
  void begin();

  void run();

 private:
  // WiFi settings


  // file logger
  const char *LOG_FILENAME = "/www/sensor.log";
  Logger _logger;

  BMP280Sensor _bmp280;
  DHTSensor _dht22;
  MQ135Sensor _mq135;
  // MQTTService _mqttService;
  // WebSocketListener _wsl;

  JsonArray &getLastSensorValues();
};

#endif  // ESP8266_H