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

// after save triggers for cleaning up sensor history

Parse.Cloud.afterSave("BMP280", (request) => {

  // query overdue entities
  var BMP280 = Parse.Object.extend("BMP280");
  var query = new Parse.Query(BMP280);
  query.equalTo("device", request.object.get("device"));
  query.skip(1000); // keep only the last 1K entries
  query.descending("createdAt");
  query.limit(1000);

  // find entities overdue
  query.find({ sessionToken: request.user.getSessionToken() })
    .then((results) => {
      // delete entities
      results.forEach(e => {
        e.destroy({ sessionToken: request.user.getSessionToken() });
      });
    }, (error) => {
      console.error("Query BMP280 entries failed.", error);
    });
});

Parse.Cloud.afterSave("BME280", (request) => {

  // query overdue entities
  var BME280 = Parse.Object.extend("BME280");
  var query = new Parse.Query(BME280);
  query.equalTo("device", request.object.get("device"));
  query.skip(1000); // keep only the last 1K entries
  query.descending("createdAt");
  query.limit(1000);

  // find entities overdue
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

Parse.Cloud.afterSave("BME680", (request) => {

  // query overdue entities
  var BME680 = Parse.Object.extend("BME680");
  var query = new Parse.Query(BME680);
  query.equalTo("device", request.object.get("device"));
  query.skip(1000); // keep only the last 1K entries
  query.descending("createdAt");
  query.limit(1000);

  // find entities overdue
  query.find({ sessionToken: request.user.getSessionToken() })
    .then((results) => {
      // delete entities
      results.forEach(e => {
        e.destroy({ sessionToken: request.user.getSessionToken() });
      });
    }, (error) => {
      console.error("Query BME680 entries failed.", error);
    });
});