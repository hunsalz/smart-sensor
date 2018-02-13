'use strict';

const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// max number of sensor values
const MAX_ENTRIES = 250;

// manage new BMP280 entries
// - add a UNIX timestamp if entry lacks any timestamp value
// - truncate history if exceeds max. entries
exports.bmp280 = functions.database.ref('/bmp280/{message}').onCreate(event => {

    // add a UNIX timestamp if message lacks any timestamp value
    const message = event.data.val();
    if (!message.timestamp) {
        event.data.adminRef.update({
            altitude: message.altitude,
            pressure: message.pressure,
            temperature: message.temperature,
            timestamp: Date.now()
        });
    }

    return truncate(event.data.ref.parent);
});

// manage new DHT22 entries
// - add a UNIX timestamp if entry lacks any timestamp value
// - truncate history if exceeds max. entries
exports.dht22 = functions.database.ref('/dht22/{message}').onCreate(event => {

    // add a UNIX timestamp if message lacks any timestamp value
    const message = event.data.val();
    if (!message.timestamp) {
        event.data.adminRef.update({
            temperature: message.temperature,
            humidity: message.humidity,
            timestamp: Date.now()
        });
    }

    return truncate(event.data.ref.parent);
});

// manage new MQ135 entries
// - add a UNIX timestamp if entry lacks any timestamp value
// - truncate history if exceeds max. entries
exports.mq135 = functions.database.ref('/mq135/{message}').onCreate(event => {

    // add a UNIX timestamp if message lacks any timestamp value
    const message = event.data.val();
    if (!message.timestamp) {
        event.data.adminRef.update({
            co2: message.co2,
            ppm: message.ppm,
            timestamp: Date.now()
        });
    }

    return truncate(event.data.ref.parent);
});

function truncate(parentRef) {

    return parentRef.once('value').then((snapshot) => {
        if (snapshot.numChildren() >= MAX_ENTRIES) {
            let childCount = 0;
            const updates = {};
            snapshot.forEach((child) => {
                if (++childCount <= snapshot.numChildren() - MAX_ENTRIES) {
                    updates[child.key] = null;
                }
            });
            // update the parent to remove child notes effectively
            return parentRef.update(updates);
        }
        return null;
    });
}