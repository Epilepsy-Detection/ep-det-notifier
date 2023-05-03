const amqp = require('amqplib');


module.exports.consumeMessages = async () => {
    try {
        const connection = await amqp.connect(process.env.AMQP_URL);
        if(connection) {
          console.log('Connected to ranbbitMQ successfully');
        }
        const channel = await connection.createChannel();
    
        await channel.assertQueue(process.env.QUEUE_NAME);
        console.log(`Listening for messages on queue "${process.env.QUEUE_NAME}"...`);
    
        channel.consume(process.env.QUEUE_NAME, (message) => {
          console.log(`Received message: ${message.content.toString()}`);
        });
      } catch (error) {
        console.error(error);
      }
}
