# Smart-Sensor

[![Build Status](https://travis-ci.org/hunsalz/smart-sensor.svg?branch=master)](https://travis-ci.org/hunsalz/smart-sensor)
[![License](https://img.shields.io/badge/license-MIT%20License-blue.svg)](http://doge.mit-license.org)

## [Smart-Sensor-App ↗](https://hunsalz.github.io/smart-sensor/)

## Story

Smart-Sensor consists of various sensor input sources and a central [Progressive Web App](https://en.wikipedia.org/wiki/Progressive_web_applications). Sensor values are collected via separate ESP units. Smart-Sensor-App is build with [Vue.js](https://vuejs.org/). The App is easily extandable by new sensor devices and shows sensor updates instantly. As backend service [Parse Server](https://parseplatform.org/) is used.

## Features

* Fulfills [Progressive Web Application characteristics](https://en.wikipedia.org/wiki/Progressive_web_applications#Characteristics)
* No cloud vendor lock-in with [Parse](https://parseplatform.org/)
* Possible to use in a local setup without cloud provider
* Low-price hardware

## Impressions

![Mobile view - i18n](./images/Mobile%20view%20-%20i18n.png)
![Mobile view - expanded](./images/Mobile%20view%20-%20expanded.png)
![ESP32 wired up with BME280](./images/ESP32%20wired%20up%20with%20BME280.png)

## Hardware components

* (NodeMCU) ESP32 or ESP8266
* A bunch of exemplary [Bosch environmental sensors](https://www.bosch-sensortec.com/bst/products/environmental/integrated_environmental_unit/overview_integratedenvironmentalunit)
* A bunch of wires

## Software components

* ESP sketches with ESP32 and ESP8266 support for different sensor types: [BME280](/BME280), [BME680](/BME680), [BMP085](/BMP085), [BMP280](/BMP280)
* Parse [cloud functions](/parse-server) and upload folder.
* [PWA](/smart-sensor-app) build with [Vue.js](https://vuejs.org/)