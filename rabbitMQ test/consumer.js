const amqp = require("amqplib");
const redisService = require("../services/redisService");
const Patient = require("ep-det-core/models/mongoose/patient");

module.exports.consumeMessages = async () => {
  try {
    const connection = await amqp.connect(process.env.AMQP_URL);
    if (connection) {
      console.log("Connected to ranbbitMQ successfully");
    }
    const channel = await connection.createChannel();

    await channel.assertQueue(process.env.QUEUE_NAME);
    console.log(
      `Listening for messages on queue "${process.env.QUEUE_NAME}"...`
    );

    channel.consume(
      process.env.QUEUE_NAME,
      async (message) => {
        console.log(`Received message: ${message.content.toString()}`);
        
        const messageObj = JSON.parse(message.content.toString());

        const storedValue = await redisService.getPatient(messageObj.patientId);

        if(storedValue.label == messageObj.label){
          //do nothing.
          console.log("Patient already exists in redis");
        }
        else if(storedValue.label == null || storedValue.label != messageObj.label){
          redisService.setPatient(messageObj.patientId,messageObj.label, messageObj.timestamp);
          console.log("Patient new value added to redis");

          //TODO:get contact number from database and send whatsapp message
          
          
        }
      },
      {
        noAck: true,
      }
    );
  } catch (error) {
    console.error(error);
  }
};
