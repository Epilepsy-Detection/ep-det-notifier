const dotenv = require('dotenv');
const setupDB = require("ep-det-core/startup-modules/db");
const Patient = require("ep-det-core/models/mongoose/patient");
// const mongoose = require("mongoose");

const queueName = 'my_queue';
const mqUrl = 'amqp://localhost:5672';

async function consumeMessages() {
    try {
        const connection = await amqp.connect(mqUrl);
        const channel = await connection.createChannel();
    
        await channel.assertQueue(queueName);
        console.log(`Listening for messages on queue "${queueName}"...`);
    
        channel.consume(queueName, (message) => {
          console.log(`Received message: ${message.content.toString()}`);
        });
      } catch (error) {
        console.error(error);
      }
}


dotenv.config({path:'.env'});

console.log(process.env.MONGO_URI);
setupDB(console);
//consumeMessages();
