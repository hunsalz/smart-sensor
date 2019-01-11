// test for Alexa Skill or Dialogflow
Parse.Cloud.define("temperature", async (request) => {

  console.log(request);

  let message = Object();
  message.text = "Die Temperatur ist 22 Grad."
  message.type = 0;

  return message;
});

Parse.Cloud.define('test', async (request, response) => {

  response.text = "text";
  console.log(response);

  return JSON.stringify({ x: 5, y: 6 });
});

// after save triggers for cleaning up sensor history

Parse.Cloud.afterSave("BMP280", (request) => {

  // query overdue entities
  var BMP280 = Parse.Object.extend("BMP280");
  var query = new Parse.Query(BMP280);
  query.equalTo("device", request.object.get("device"));
  query.skip(100); // keep only the last 100 entries
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
  query.skip(100); // keep only the last 100 entries
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
  query.skip(100); // keep only the last 100 entries
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