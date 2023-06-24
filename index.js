const dotenv = require("dotenv");
const setupDB = require("ep-det-core/startup-modules/db");
const { consumeMessages } = require("./rabbitMQ test/consumer");

//getting some random patient emerngency contact from the database
//hard coding the patient id for now : 641e1b6ecfd4ffd65226a778

dotenv.config(".env");

setupDB(console);
consumeMessages();
