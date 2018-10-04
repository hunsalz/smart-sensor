#include <Esp8266Utils.h>     // https://github.com/hunsalz/esp8266utils
#include <Log4Esp.h>          // https://github.com/hunsalz/log4Esp

#include "config.h"

// web server settings
const static int PORT = 80;

esp8266utils::BME680Sensor _bme680;

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

  // sensor setup
  if (_bme680.begin(0x77)) {
    LOG.verbose(F("BME680 is ready."));
  } else {
    LOG.error(F("Setup BME680 failed!"));
  }

  // WiFi setup
  WIFI_STA_CFG.addAP(WIFI_SSID_1, WIFI_PSK_1);
  WIFI_STA_CFG.addAP(WIFI_SSID_2, WIFI_PSK_2);
  WIFI_STA_CFG.begin();

  // increase loop interval
  SYS_CFG.setLoopInterval(LOOP_INTERVAL);

  #ifdef ENABLE_WEBSERVER

  // MDNS setup
  MDNS_CFG.begin("esp8266");
  MDNS.addService("http", "tcp", PORT);

  // file system setup to enable static web server content
  FILESYSTEM.begin();

  // web server setup
  SERVER.begin();
  // rewrite root context
  SERVER.getWebServer().rewrite("/", "/index.build.html");
  // handle static web resources
  SERVER.getWebServer().serveStatic("/", SPIFFS, "/www/", "max-age:15");
  // cache-control 15 seconds
  // add dynamic http resources
  SERVER.on("/fs", HTTP_GET, [](AsyncWebServerRequest* request) {
    SERVER.send(request, esp8266utils::APP_JSON, FILESYSTEM.getStorageDetails());
  });
  SERVER.on("/files", HTTP_GET, [](AsyncWebServerRequest* request) {
    SERVER.send(request, esp8266utils::APP_JSON, FILESYSTEM.getFileListing());
  });
  SERVER.on("/sta", HTTP_GET, [](AsyncWebServerRequest* request) {
    SERVER.send(request, esp8266utils::APP_JSON, WIFI_STA_CFG.getDetails());
  });
  SERVER.on("/esp", HTTP_GET, [](AsyncWebServerRequest* request) {
    SERVER.send(request, esp8266utils::APP_JSON, SYS_CFG.getDetails());
  });
  SERVER.on("/bme680", HTTP_GET, [](AsyncWebServerRequest* request) {
    SERVER.send(request, esp8266utils::APP_JSON, _bme680.getValuesAsJson());
  });

  #endif // NO_WEBSERVER

  LOG.verbose(F("========================="));
  LOG.verbose(F("Setup finished. Have fun."));
  LOG.verbose(F("========================="));
}

void loop() {
  
  ESP.wdtDisable();
  if (SYS_CFG.nextLoopInterval()) {
       
    #ifdef ENABLE_WEBSERVER
    MDNS.update();
    #endif // NO_WEBSERVER

    _bme680.update(USE_MOCK_DATA);
    LOG.verbose(F("Set value|%s|%s"), "BME680", _bme680.getValuesAsJson().c_str());
  }
  ESP.wdtEnable(30000);

  //ESP.deepSleep(30e6);
  // reserve time for core processes
  delay(500);
}
