# Weather-Station

[![Build Status](https://travis-ci.org/hunsalz/weather-station.svg?branch=master)](https://travis-ci.org/hunsalz/weather-station)
[![License](https://img.shields.io/badge/license-MIT%20License-blue.svg)](http://doge.mit-license.org)

## [Weather-Station](https://weather-station-8266.firebaseapp.com/) online.

Weather-Station is a [Polymer 2.0](https://www.polymer-project.org/2.0/) app hosted on [Firebase](https://firebase.google.com). All sensor values are collected by an ESP8266 development board. The ESP8266 pushes all collected sensor values into a [Firebase Realtime Database](https://firebase.google.com/docs/database/). Values are pre-processed by [Cloud Functions for Firebase](https://firebase.google.com/docs/functions/) to extend sensor values by timestamp and to limit the amount of historical values. Any new values are displayed instantly. The App itself is easily extandable by new widgets.

## Hardware listing

* Amica NodeMCU ESP8266 - *Important note: Not all ESP8266 development boards are compatible with the offered motor shields. Especially the sizing of the LoLin NodeMCU V3 doesn't fit together.*
* TODO add sensor listing
* A bunch of wires

## Pictures of hardware assembling

TODO

## Impressions

TODO replace with new images

### Desktop view
![weather-station-desktop view](https://cloud.githubusercontent.com/assets/16960855/20327330/e07c3480-ab8c-11e6-9270-0f31b35fc313.png)

### Mobile portrait view
![weather-station-mobile-portrait-view](https://cloud.githubusercontent.com/assets/16960855/20327369/0e7733e4-ab8d-11e6-8887-3b5e636c3d24.png)

### Mobile landscape view
![weather-station-mobile-landscape-view](https://cloud.githubusercontent.com/assets/16960855/20327350/f86fa34c-ab8c-11e6-8bf3-dff82b49c139.png)

## Setup Weather-Station

TODO describe local build steps
