# Weather-Station is a Polymer App for my small LEGO house with various sensors

**Key features**

* Full UI responsiveness
* Pure client side dashboard
* Client side caching of previous sensor data
* Service worker enabled
* Easy to extend with other sensor data and/or complete new widgets

Open issues

* Browser compatibility with Firefox
* Upgrade sources to Polymer 2.0
* Secure MQTT credentials; rethink authentication

**Impressions**

TBD - picture of the LEGO house
TBD - picture of the Weather Station App

**The Weather-Station source code, hardware layout and infrastructure setup**

All details about source code, hardware layout and infrastructure setup can be found [here](https://github.com/hunsalz/ESP8266/tree/master/WeatherStation).

### Setup

##### Prerequisites

Install [bower](https://bower.io/):

    npm install -g bower

Install [polymer-cli](https://github.com/Polymer/polymer-cli):

    npm install -g polymer-cli

### Load dependencies and start the development server

Loading all dependencies:

    bower install

Starting the app at `http://localhost:8080`:

    polymer serve
