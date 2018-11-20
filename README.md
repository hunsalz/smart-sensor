# Smart-Sensor

[![Build Status](https://travis-ci.org/hunsalz/smart-sensor.svg?branch=master)](https://travis-ci.org/hunsalz/smart-sensor)
[![License](https://img.shields.io/badge/license-MIT%20License-blue.svg)](http://doge.mit-license.org)

## Watch [Smart-Sensor-App ↗](https://smart-sensor.back4app.io/) live.

Smart-Sensor consists of various sensor input sources and a central Progressive Web App. Sensor values are collected via separate ESP8266 units. Smart-Sensor-App is build with [Polymer 3.0](https://polymer-library.polymer-project.org/3.0/docs/devguide/feature-overview). The App is easily extandable by new widgets and shows new sensor values instantly. As backend service [Parse](https://parseplatform.org/) is used.

## Features

* TODO

## Hardware listing

* (NodeMCU) ESP8266
* TODO add sensor listing
* A bunch of wires

## Pictures of hardware assembling

TODO

## Impressions

TODO 

## Setup Smart-Sensor-App

1. Install Polymer dependencies
```
npm install -g polymer-cli
cd smart-sensor-app/
```

2. TODO

3. Create Parse project

TODO

*Note:* Change entries in `./smart-sensor-app/src/smart-sensor-app/smart-sensor-app.html` accordingly!

4. Deploy project

TODO

5. Upload sketch to ESP8266

Rename `config.h.template` to `config.h` and insert `APPLICATION_ID` and `CLIENT_KEY` accordingly.