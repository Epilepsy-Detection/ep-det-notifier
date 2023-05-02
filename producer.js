const amqp = require('amqplib');


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
        
        await channel.assertQueue(process.env.QUEUE_NAME);
        await channel.sendToQueue(process.env.QUEUE_NAME, Buffer.from(message));
        console.log(`Message "${message}" sent to queue "${process.env.QUEUE_NAME}"`);

      } catch (error) {
        console.error(error);
      }
}

module.exports = produceMessages;