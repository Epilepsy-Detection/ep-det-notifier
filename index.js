const dotenv = require("dotenv");
const setupDB = require("ep-det-core/startup-modules/db");
const { consumeMessages } = require("./consumer");

dotenv.config(".env");

setupDB(console);
consumeMessages();

