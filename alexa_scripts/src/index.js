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

let catName = "Lotte";
let ort ="Uhlbach";
let zeit = "5 minuten";

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
        handleNewFactRequest(response);
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
function handleNewFactRequest(response) {
    

    
    //array [] danit defeniert man listen
    var antworten = [
        catName + " ist gerade in " + ort + ".",
       catName + " treibt sich gerade in " + ort + " rum.",
       catName + " befindet sich in " + ort + ".",
       catName + " treibt sich in " + ort +" herum. ",
      catName + " war vor "+zeit+" in " + ort + ".",
      catName + " hält sich in " + ort + " auf. ",
    ];

    // Get a random space fact from the space facts list
    var index = Math.floor(Math.random() * antworten.length);

    var speechOutput = antworten[index];
    //if(this.attributes['ort']) ort = this.attributes['ort'];
    // Create speech output
    var cardTitle = catName + " wurde gefunden.";
    /*if (index > -1) {
        this.attributes[catName] = location;
    }*/
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    //var alexa = AlexaSkill.handler(event, context, callback);
    // Create an instance of the SpaceGeek skill.
    var catfinder = new Catfinder();
    //alexa.dynamoDBTableName = 'catfinder'; // That's it!
    catfinder.execute(event, context);
};

