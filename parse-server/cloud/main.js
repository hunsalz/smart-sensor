// declare sub classes
const BME280 = Parse.Object.extend("BME280");
const DEVICE = Parse.Object.extend("Device");

// Dialogflow fulfillment
// TODO consider timestamp of sensor value
// TODO i18n
Parse.Cloud.define("temperature", async (request) => {

  const label = request.params.label;
  const temperature = request.params.temperature;

  // try to find device by label
  let query = new Parse.Query(DEVICE);
  query.equalTo("label", label);
  const device = await query.first();

  // return 3 alternative labels as response if no corresponding device was found
  if (!device) {
    query = new Parse.Query(DEVICE);
    query.limit(3);
    const devices = await query.find();
    let labels = [];
    devices.forEach(device => {
      labels.push(device.get('label') ? device.get('label') : device.get('name'));
    });
    // build response
    let response = {};
    response.fulfillmentText = 'Kein Sensor mit Bezeichnung ' + label + ' gefunden.';
    response.fulfillmentMessages = [];
    response.payload = {
      'labels': labels
    };
    return response;
  }

  // lookup last sensor value by device
  query = new Parse.Query(BME280);
  query.equalTo("device", device.get('name'));
  query.descending("createdAt");
  const bme280 = await query.first();
  // return last sensor value
  if (bme280) {
    // build response
    let response = {};
    response.fulfillmentText = 'Die Temperatur beträgt ' + bme280.get('temperature') + '°';
    response.fulfillmentMessages = [];
    // response.temperature = bme280.get('temperature');
    // response.humidity = bme280.get('humidity');
    // response.createdAt = bme280.get('createdAt');
    response.payload = {
      'label': request.params.label,
      'temperature' : request.params.temperature,
      'device' : device.get('name')
    };
    return response;

  // otherwise return that no data is available
  } else {
    response.fulfillmentText = 'Keine Daten für Sensor mit Bezeichnung ' + label + ' verfügbar.';
    response.fulfillmentMessages = [];
    return response;
  }
});

Parse.Cloud.define("getBME280Devices", async (request) => {

  let query = new Parse.Query(BME280);
  await query.distinct("device")
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.error(error);
    });
});

// TODO split afterSave() in sub-functions and add implementations for other sensor classes

Parse.Cloud.afterSave("BME280", async (request) => {

  // create device if not already exists
  var name = request.object.get("device");
  var query = new Parse.Query(DEVICE);
  query.equalTo("name", name);
  const result = await query.first();
  if (!result) {
    // be aware that only the underlying db schema can give concurrency safety
    const device = new Device();
    device.set("name", name);
    device.save()
      .then((device) => {
        console.log("Save device successful.", device);
      }, (error) => {
        console.error("Save device failed.", device, error);
      });
  }

  // build query that fetch all overdue entities
  var query = new Parse.Query(BME280);
  query.equalTo("device", name);
  query.skip(1000); // keep only the last 1K entries
  query.descending("createdAt");
  query.limit(1000);

  // find & process all overdue entities 
  query.find({ sessionToken: request.user.getSessionToken() })
    .then((results) => {
      // delete entities
      results.forEach(e => {
        e.destroy({ sessionToken: request.user.getSessionToken() });
      });
    }, (error) => {
      console.error("Query BME280 entries failed.", error);
    });
});