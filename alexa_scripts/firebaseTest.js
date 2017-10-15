var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyCJrFahst4OYM7qglxEphrEdIqfjE_K59c",
    authDomain: "httf-catfinder.firebaseapp.com",
    databaseURL: "https://httf-catfinder.firebaseio.com",
    projectId: "httf-catfinder",
    storageBucket: "httf-catfinder.appspot.com",
    messagingSenderId: "717334225100"
  };
 

var app = firebase.initializeApp(config);
var database = app.database();

writeMietzenData("Lotte", 49.222, 19.222);

function writeMietzenData(name, lat, lon) {
    firebase.database().ref('mietzen/' + name).set({
      name: name,
      lat: lat,
      lon : lon
    });
  }




