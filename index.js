const dotenv = require('dotenv');
const setupDB = require("ep-det-core/startup-modules/db");
const Patient = require("ep-det-core/models/mongoose/patient");
const amqp = require('amqplib');
// const mongoose = require("mongoose");

const mqUrl = 'amqp://localhost';
const queueName = 'myqueue';
const rabbitSettings = {
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672,
    username: 'guest',
    password: 'guest',
    vhost: '/',
    authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL'],
  };

async function produceMessages() {
    try {
        const connection = await amqp.connect(rabbitSettings);
        if(connection) {
          console.log('Connected to ranbbitMQ successfully');
        }
        const channel = await connection.createChannel();
        const message = 'Hello world';
        
        await channel.assertQueue(queueName);
        await channel.sendToQueue(queueName, Buffer.from(message));
        console.log(`Message "${message}" sent to queue "${queueName}"`);

        // await channel.close();
        // await connection.close();
      } catch (error) {
        console.error(error);
      }
}

async function consumeMessages() {
    try {
        const connection = await amqp.connect(mqUrl);
        if(connection) {
          console.log('Connected to ranbbitMQ successfully');
        }
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
produceMessages();
consumeMessages();
