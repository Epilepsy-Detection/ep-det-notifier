const dotenv = require('dotenv');
const setupDB = require("ep-det-core/startup-modules/db");
const Patient = require("ep-det-core/models/mongoose/patient");
const amqp = require('amqplib');
const produceMessages = require('./rabbitMQ test/producer');
const consumeMessages = require('./rabbitMQ test/consumer');
const redisService = require('./services/redisService');


//getting some random patient emerngency contact from the database
//hard coding the patient id for now : 641e1b6ecfd4ffd65226a778
async function getPatient() {

// const patient = await Patient.findById("641e1b6ecfd4ffd65226a778");
// const emergencyContact = patient.emergencyContact[0];
const emergencyContact = {
    "name": "John Doe",
    "phoneNumber": "12345678900"
}
const predictionResult = "Epilepsy detected";

redisService.setContact(emergencyContact.phoneNumber, predictionResult);

redisService.getContact(emergencyContact.phoneNumber);

//redisService.deleteContact(emergencyContact.phoneNumber);

}
   




// setupDB(console);
getPatient();
// produceMessages();
// consumeMessages();
