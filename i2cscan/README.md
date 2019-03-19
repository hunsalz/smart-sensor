# I²C scanner

This sketch scans the [I²C](https://en.wikipedia.org/wiki/I%C2%B2C)-bus for I²C peripherals. If a peripheral is found, it is reported to the Arduino serial monitor.

The reported 7-bit address is used with "Wire.begin" function to get I²C communication working.