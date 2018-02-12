'use strict';

const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// max number of sensor values
const MAX_ENTRIES = 5;

// adds a UNIX timespamp if message lacks any timestamp value
exports.bmp280 = functions.database.ref('/bmp280/{message}').onCreate(event => {

    const message = event.data.val();
    if (!message.timestamp) {
        return event.data.adminRef.update({
            altitude: message.altitude,
            pressure: message.pressure,
            temperature: message.temperature,
            timestamp: Date.now()
        });
    }

    return null;
});

exports.truncate = functions.database.ref('/bmp280/{message}').onCreate((event) => {

    const parentRef = event.data.ref.parent;
    return parentRef.once('value').then((snapshot) => {
        if (snapshot.numChildren() >= MAX_ENTRIES) {
            
            console.log("truncate BMP280 entries :: " + snapshot.numChildren());
            
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
});