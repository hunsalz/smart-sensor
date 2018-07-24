'use strict';

const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// max number of sensor values
const MAX_ENTRIES = 250;

// manage new BMP280 entries
// - add a UNIX timestamp if entry lacks any timestamp value
// - truncate history if exceeds max. entries
exports.bmp280 = functions.database.ref('/bmp280/{message}')
    .onCreate((snapshot, context) => {
        // add a UNIX timestamp if message lacks any timestamp value
        const message = snapshot.val();
        if (!message.timestamp) {
            snapshot.ref.update({
                altitude: message.altitude,
                pressure: message.pressure,
                temperature: message.temperature,
                timestamp: Date.now()
            });
        }
    return truncate(snapshot.ref.parent);
});

// manage new DHT11 entries
// - add a UNIX timestamp if entry lacks any timestamp value
// - truncate history if exceeds max. entries
exports.dht11 = functions.database.ref('/dht11/{message}')
    .onCreate((snapshot, context) => {
        // add a UNIX timestamp if message lacks any timestamp value
        const message = snapshot.val();
        if (!message.timestamp) {
            snapshot.ref.update({
                temperature: message.temperature,
                humidity: message.humidity,
                timestamp: Date.now()
            });
        }
    return truncate(snapshot.ref.parent);
});

// manage new DHT22 entries
// - add a UNIX timestamp if entry lacks any timestamp value
// - truncate history if exceeds max. entries
exports.dht22 = functions.database.ref('/dht22/{message}')
    .onCreate((snapshot, context) => {
        // add a UNIX timestamp if message lacks any timestamp value
        const message = snapshot.val();
        if (!message.timestamp) {
            snapshot.ref.update({
                temperature: message.temperature,
                humidity: message.humidity,
                timestamp: Date.now()
            });
        }
    return truncate(snapshot.ref.parent);
});

// manage new MQ135 entries
// - add a UNIX timestamp if entry lacks any timestamp value
// - truncate history if exceeds max. entries
exports.mq135 = functions.database.ref('/mq135/{message}')
    .onCreate((snapshot, context) => {
        // add a UNIX timestamp if message lacks any timestamp value
        const message = snapshot.val();
        if (!message.timestamp) {
            snapshot.ref.update({
                ppm: message.ppm,
                timestamp: Date.now()
            });
        }
    return truncate(snapshot.ref.parent);
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