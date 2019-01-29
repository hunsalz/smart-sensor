// Dialogflow fulfillment
Parse.Cloud.define("temperature", async (request) => {

  var place = request.params.place;
  // TODO match place => device - how to proceed if no place match / is provided ?
  var device = "ESP-2355357";

  console.log("req => ", request);

  var response = Object();
  var BME280 = Parse.Object.extend("BME280");
  var query = new Parse.Query(BME280);
  query.equalTo("device", device);
  query.descending("createdAt");
  
  const result = await query.first();
  if (result) {
    // TODO wrong place for fulfillment
    response.fulfillmentText = 'Die Temperatur beträgt ' + result.get('temperature') + '°';
    response.fulfillmentMessages = [];

    response.temperature = result.get('temperature');
    response.humidity = result.get('humidity');
    response.createdAt = result.get('createdAt');
    /// ... more
    response.place = place;
    response.device = device;
  };

  return response;
});

// TODO split afterSave() in sub-functions and add implementations for other sensor classes

Parse.Cloud.afterSave("BME280", async (request) => {

  // create device if not already exists
  var name = request.object.get("device");
  const Device = Parse.Object.extend("Device");
  var query = new Parse.Query(Device);
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
  var BME280 = Parse.Object.extend("BME280");
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