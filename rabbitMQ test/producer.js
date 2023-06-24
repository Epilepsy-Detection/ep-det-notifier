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

module.exports.produceMessages = async() =>{
    try {
        const connection = await amqp.connect(rabbitSettings);
        if(connection) {
          console.log('Connected to ranbbitMQ successfully');
        }
        const channel = await connection.createChannel();

        let message = {
          
          "patientId": "6404726a2cf212a075d01a9e",
          "label": "B",
          "timestamp": "2023-05-06T12:00:00.000Z",
        }

        message = JSON.stringify(message);
        
        await channel.assertQueue(process.env.QUEUE_NAME);
        await channel.sendToQueue(process.env.QUEUE_NAME, Buffer.from(message));
        console.log(`Message "${message}" sent to queue "${process.env.QUEUE_NAME}"`);

      } catch (error) {
        console.error(error);
      }
}