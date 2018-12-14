Parse.Cloud.afterSave("BMP280", (request) => {
  
  const query = new Parse.Query("BMP280");
  query.descending("createdAt");
  // narrow by device if given
  if (request.device) {
    query.equalTo("device", request.device);
  }
  query.skip(100); // keep the last 100 entries
  query.find({sessionToken: request.user.getSessionToken()})
    .then((results) => {
      results.forEach(e => {
        e.destroy({sessionToken: user.getSessionToken()});
      });
    }, (error) => {
      console.error("Query BMP280 entries failed.", error);
  });
});

Parse.Cloud.afterSave("BME280", (request) => {
  
  const query = new Parse.Query("BME280");
  query.descending("createdAt");
  // narrow by device if given
  if (request.device) {
    query.equalTo("device", request.device);
  }
  query.skip(100); // keep the last 100 entries
  query.find({sessionToken: request.user.getSessionToken()})
    .then((results) => {
      results.forEach(e => {
        e.destroy({sessionToken: user.getSessionToken()});
      });
    }, (error) => {
      console.error("Query BME280 entries failed.", error);
  });
});

Parse.Cloud.afterSave("BME680", (request) => {
  
  const query = new Parse.Query("BME680");
  query.descending("createdAt");
  // narrow by device if given
  if (request.device) {
    query.equalTo("device", request.device);
  }
  query.skip(100); // keep the last 100 entries
  query.find({sessionToken: request.user.getSessionToken()})
    .then((results) => {
      results.forEach(e => {
        e.destroy({sessionToken: user.getSessionToken()});
      });
    }, (error) => {
      console.error("Query BME680 entries failed.", error);
  });
});