# Weather-Station is a Polymer App showing various sensor data

**Key features**

* Full UI responsiveness
* Pure client side dashboard
* Client side caching of previous sensor data
* Service worker enabled
* Easy to extend with other sensor data and/or complete new widgets

**Open issues**

* Browser compatibility with Firefox
* Upgrade sources to Polymer 2.0
* Secure MQTT credentials; rethink authentication

## Impressions

### Desktop view
![weather-station-desktop view](https://cloud.githubusercontent.com/assets/16960855/20327330/e07c3480-ab8c-11e6-9270-0f31b35fc313.png)

### Mobile portrait view
![weather-station-mobile-portrait-view](https://cloud.githubusercontent.com/assets/16960855/20327369/0e7733e4-ab8d-11e6-8887-3b5e636c3d24.png)

### Mobile landscape view
![weather-station-mobile-landscape-view](https://cloud.githubusercontent.com/assets/16960855/20327350/f86fa34c-ab8c-11e6-8bf3-dff82b49c139.png)

##The Weather-Station source code, hardware layout and infrastructure setup

All details about source code, hardware layout and infrastructure setup can be found [here](https://github.com/hunsalz/ESP8266/tree/master/WeatherStation).

## Setup Weather Station

### Prerequisites

Install [bower](https://bower.io/):

    npm install -g bower

Install [polymer-cli](https://github.com/Polymer/polymer-cli):

    npm install -g polymer-cli

### Load dependencies and start the development server

Loading all dependencies:

    bower install

Starting the app at `http://localhost:8080`:

    polymer serve
