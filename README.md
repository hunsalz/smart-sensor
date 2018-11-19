# Smart-Sensor

[![Build Status](https://travis-ci.org/hunsalz/smart-sensor.svg?branch=master)](https://travis-ci.org/hunsalz/smart-sensor)
[![License](https://img.shields.io/badge/license-MIT%20License-blue.svg)](http://doge.mit-license.org)

## Watch [Smart-Sensor-App ↗](https://smart-sensor.back4app.io/) live.

Smart-Sensor-App is a Progressive Web App build with [Polymer 3.0](https://polymer-library.polymer-project.org/3.0/docs/devguide/feature-overview). As backend service [Parse](https://parseplatform.org/) is used. Application shows sensor values collected by an ESP8266 development board. Values are post-processed by [Cloud Code](https://docs.parseplatform.org/cloudcode/guide/) to limit the amount of historical values. New values are shown instantly. The App itself is easily extandable by new widgets.

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