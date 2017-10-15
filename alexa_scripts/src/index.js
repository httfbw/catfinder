/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.ask.skill.48373454-436f-483b-a59d-9a8f37935ec7";

/**
 * Arrays containing statements.
 */

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');
var Alexa = require('alexa-sdk');
var AWS = require('aws-sdk');

AWS.config.loadFromPath('./config.json');
// Create the DynamoDB service object
let ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});


/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Catfinder = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Catfinder.prototype = Object.create(AlexaSkill.prototype);
Catfinder.prototype.constructor = Catfinder;

Catfinder.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    
};

Catfinder.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Catfinder.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Catfinder.prototype.intentHandlers = {
    "GetNewFindIntent": function (intent, session, response) {
        handleNewFindRequest(intent, response);
    },

    "ResetIntent": function (intent, session, response) {
        handleResetRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("Du kannst sagen wo ist meine Kate, oder, du kannst exit sagen... wie kann ich dir helfen?", "Wie kann ich dir helfen?"); 
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Ciao";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Tschüss";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFindRequest(intent, response) {
    
    let catName;
    if(intent.slots.CAT.value)catName = intent.slots.CAT.value;
    else {
        var speechOutput = "Leider habe ich den Namen deiner Katze nicht verstanden oder ich kenne sie nicht.";
        var cardTitle = "Diese Katze kenne ich nicht.";
        response.tellWithCard(speechOutput, cardTitle, speechOutput);
        return;
    } 

    let ort ="Uhlbach";
    let zeit = "5 minuten";

    var params = {
        TableName: 'catfinder',
        Key: {
          "name": {
              "S": catName
          }
        },
        ProjectionExpression: 'ort, zeit'
      };
    
    // Call DynamoDB to read the item from the table
    ddb.getItem(params, function(err, data) {
        if (err) {
        console.log("Error", err);
        } else {
            //if(data.item) console.log("Success", data.Item);
            ort = data.Item.ort.S;
            timestamp = data.Item.zeit.S;
        }


        var diffInMinutes = Math.round((Math.round((new Date).getTime() / 1000) - parseInt(data.Item.zeit.S)) / 60)      
        var zeit = diffInMinutes;

        //array [] danit defeniert man listen
    var antworten = [
        catName + " befand sich in " + ort + " vor " + zeit + " Minuten.",
        catName + " trieb sich vor" + zeit + " Minuten  in " + ort +" herum.",
        catName + " war vor " + zeit + " Minuten in " + ort + ".",
        catName + " hat sich vor " + zeit + " Minuten in " + ort + " aufgehalten.",
        catName + " ist vor " + zeit + " Minuten in " + ort + "herumgeflitzt",
        catName + " springt in " + ort + " herum ",
        catName + " rennt in " + ort + " herum.",
        catName + " wurde vor " + zeit + " Minuten in " + ort + "gesehen."
    ];

    // Get a random space fact from the space facts list
    var index = Math.floor(Math.random() * antworten.length);
    var speechOutput = antworten[index];
    var cardTitle = catName + " wurde gefunden.";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);

    });

    
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context, function(){

    });
    // Create an instance of the SpaceGeek skill.
    var catfinder = new Catfinder();
    alexa.dynamoDBTableName = 'catfinder'; // That's it!
    catfinder.execute(event, context);
};

