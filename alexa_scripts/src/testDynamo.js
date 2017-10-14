// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Load credentials and set region from JSON file
AWS.config.loadFromPath('./config.json');

// Create the DynamoDB service object
ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});

var params = {
  TableName: 'catfinder',
  Key: {
    "name": {
        "S": "Mietze"
    }
  },
  ProjectionExpression: 'lat, lon'
};

// Call DynamoDB to add the item to the table
/*ddb.putItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});*/


// Call DynamoDB to read the item from the table
ddb.getItem(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Item.lat.S);
    }
  });