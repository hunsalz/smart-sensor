Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.afterSave("BME280", (request) => {
  const query = new Parse.Query("BME280");
  query.descending("createdAt");
  query.skip(50); // keep the last 50 entries
  query.find({sessionToken: request.user.getSessionToken()})
    .then((results) => {
      results.forEach(e => {
        e.destroy({sessionToken: user.getSessionToken()});
      });
    }, (error) => {
      console.error("Query BME280 entries failed.", error);
  });
});

Parse.Cloud.afterSave("BMP280", (request) => {
  const query = new Parse.Query("BMP280");
  query.descending("createdAt");
  query.skip(50); // keep the last 50 entries
  query.find({sessionToken: request.user.getSessionToken()})
    .then((results) => {
      results.forEach(e => {
        e.destroy({sessionToken: user.getSessionToken()});
      });
    }, (error) => {
      console.error("Query BMP280 entries failed.", error);
  });
});