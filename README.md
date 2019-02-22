# Smart-Sensor

[![Build Status](https://travis-ci.org/hunsalz/smart-sensor.svg?branch=master)](https://travis-ci.org/hunsalz/smart-sensor)
[![License](https://img.shields.io/badge/license-MIT%20License-blue.svg)](http://doge.mit-license.org)
[Smart-Sensor-App ↗](https://hunsalz.github.io/smart-sensor/)

## Story

Smart-Sensor consists of various sensor input sources and a central [Progressive Web App](https://en.wikipedia.org/wiki/Progressive_web_applications). Sensor values are collected via separate ESP8266 units. Smart-Sensor-App is build with [Vue.js](https://vuejs.org/). The App is easily extandable by new cards and shows sensor values instantly. As backend service [Parse](https://parseplatform.org/) is used.

## Features

* Fulfills [Progressive Web Application characteristics](https://en.wikipedia.org/wiki/Progressive_web_applications#Characteristics)
* No cloud vendor lock-in with [Parse](https://parseplatform.org/)
* Possible to use in a local setup without cloud provider
* Low-price hardware

## Impressions

![Mobile view](./images/smart-sensor-mobile-view.png)

## Hardware components

* (NodeMCU) ESP32 or ESP8266
* Examples for [Bosch environmental sensors](https://www.bosch-sensortec.com/bst/products/environmental/integrated_environmental_unit/overview_integratedenvironmentalunit)
* A bunch of wires

## Software components

* ESP sketches with ESP32 and ESP8266 support for different sensor types: [BME280](/BME280), [BME680](/BME680), [BMP085](/BMP085), [BMP280](/BMP280)
* Parse [cloud functions](/parse-server) and upload folder.
* [PWA](/smart-sensor-app) build with [Vue.js](https://vuejs.org/)