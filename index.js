const dotenv = require('dotenv');
const setupDB = require("ep-det-core/startup-modules/db");
const Patient = require("ep-det-core/models/mongoose/patient");
const amqp = require('amqplib');
const produceMessages = require('./producer');
const consumeMessages = require('./consumer');
// const mongoose = require("mongoose");



dotenv.config({path:'.env'});
console.log(process.env.MONGO_URI);
setupDB(console);
produceMessages();
consumeMessages();
