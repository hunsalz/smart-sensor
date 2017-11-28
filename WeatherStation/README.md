# Weather station with ESP8266 / NodeMCU and a bunch of sensors in a little LEGO house. Visualization done by a self-contained Polymer App. Application hosted by Google Firebase and messaging by CloudMQTT.

##Impressions

### Weather Station
![weather-station](https://cloud.githubusercontent.com/assets/16960855/20439347/5b53152c-adbb-11e6-81cb-65d4111e7f55.jpg)

### Weather Station interior
![weather-station interior](https://cloud.githubusercontent.com/assets/16960855/20450711/cf4b0c82-adf2-11e6-89a1-6876fe1c4f8d.jpg)

### Weather Station circuit
![weather-station circuit](https://cloud.githubusercontent.com/assets/16960855/20450656/41ad42a0-adf2-11e6-9449-e9210b63ebee.jpg)

##List of hardware requirements

* ESP8266 / NodeMcu
* Power supply with power bank: e.g. Anker PowerCore 10000
* USB type A to micro USB cable
* Sensors:
  * DHT22 / measures temperature & humidity
  * BMP280 / measures temperature, pressure and altitude
  * MQ135 / cheap CO2 detection
* Resistors TBD
* Various wires
* LEGO bricks

Further improvements:

* Photocell resistor to measure brightness
* LCD or OLED display to display sensor data

##Breadboard layout

TBD

##Visualization with Polymer

Against my initial plan to use [Freeboard](https://github.com/Freeboard/freeboard) (see [MQTTPrototype](https://github.com/hunsalz/ESP8266/tree/master/MQTTPrototype)) for visualization, I started to build my own dashboard with [Polymer](https://www.polymer-project.org). Why on earth a new implementation from scratch? For sure it makes fun to implement something new in Polymer. But the reason was simply, that the development of Freeboard seems to be feel asleep for months now and in the current version a mobile responsiveness is not given. That's something I had expected for sure. So I started my search for alternatives.
[Dashing.io](http://dashing.io/) is a good candidate, I was already aware. But I didn't want to search for another hosting alternative, that supports a Ruby runtime. For my own surprise I didn't found a suitable pure JavaScript dashboard, that is better than Freeboard.
Finally I stopped searching and started to implement my own [Weather Station](https://github.com/hunsalz/weather-station).

##The infrastructure glue -  CloudMQTT and Google Firebase

In my early phase of experimenting with MQTT, I did the whole setup on my local machine: [MQTTPrototype](https://github.com/hunsalz/ESP8266/tree/master/MQTTPrototype)

With [CloudMQTT](https://www.cloudmqtt.com/) I found a nice service provider managing [Mosquitto](https://mosquitto.org/) servers in the cloud hosted by [AWS](https://aws.amazon.com). CloudMQTT offers a free plan with limited connections and message payload. Absolutely enough for setting up this project.

![weather-station-cloudmqtt-console](https://cloud.githubusercontent.com/assets/16960855/20327125/128205c8-ab8c-11e6-9b33-177346eef191.png)

For hosting my [Weather Station](https://github.com/hunsalz/weather-station) I use [Google Firebase](https://firebase.google.com/). As usual it's "free", well done and reliable.

I would recommend to install firebase-tools. It's a convenient way to interact with your project from the console:

    npm install -g firebase-tools
