# Smart-Sensor

[![Build Status](https://travis-ci.org/hunsalz/smart-sensor.svg?branch=master)](https://travis-ci.org/hunsalz/smart-sensor)
[![License](https://img.shields.io/badge/license-MIT%20License-blue.svg)](http://doge.mit-license.org)

## Watch [Smart-Sensor-App ↗](https://smart-sensor-8266.firebaseapp.com/) live.

Smart-Sensor-App is a [Polymer 2.0](https://www.polymer-project.org/2.0/) app hosted on [Firebase](https://firebase.google.com). All sensor values are collected by an ESP8266 development board. The ESP8266 pushes all collected sensor values into a [Firebase Realtime Database](https://firebase.google.com/docs/database/). Values are pre-processed by [Cloud Functions for Firebase](https://firebase.google.com/docs/functions/) to extend sensor values by timestamp and to limit the amount of historical values. Any new values are displayed instantly. The App itself is easily extandable by new widgets.

## Hardware listing

* Amica NodeMCU ESP8266 - *Important note: Not all ESP8266 development boards are compatible with the offered motor shields. Especially the sizing of the LoLin NodeMCU V3 doesn't fit together.*
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
Polymer install
cd ..
```

2. Install Firebase Cloud Functions
```
npm install -g firebase-tools
cd functions/
npm install
cd ..
```

3. Create Firebase project

```
firebase init
```

Result should look like:
```
firebase setup:web

> firebase.initializeApp({
>  "apiKey": "AIzaSyD6XnyQv2n5B5SPc4Ir2pl_Z2GiDlFwGB8",
>  "databaseURL": "https://smart-sensor-8266.firebaseio.com",
>  "storageBucket": "smart-sensor-8266.appspot.com",
>  "authDomain": "smart-sensor-8266.firebaseapp.com",
>  "messagingSenderId": "555603887556",
>  "projectId": "smart-sensor-8266"
> });
```

*Note:* Change entries in `./smart-sensor-app/src/smart-sensor-app/smart-sensor-app.html` accordingly!

4. Deploy project to Firebase 

```
firebase deploy
```

5. Upload ESP8266 sketch

Rename `config.h.template` to `config.h` and insert `FIREBASE_AUTH` = Firebase database secret. (not API-key)