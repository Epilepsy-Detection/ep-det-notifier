const amqp = require("amqplib");
const redisService = require("../services/redisService");
const Patient = require("ep-det-core/models/mongoose/patient");
const { sendWhatsappMessage } = require("../services/whatsappService");

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
        const pateintId = messageObj.patientId;
        const storedValue = await redisService.getPatient(pateintId);

        // Check if value is in redis
        // if in redis do nothing
        if (storedValue) return;
        // if not in redis, set patient id in redis with timer, and send message

        //set new patient to redis
        await redisService.setPatient(
          pateintId,
          messageObj.label,
          messageObj.timestamp
        );
        console.log(`Patient ${pateintId} has been detected with seizure!`);

        // getting contact number from database and send whatsapp message
        const patient = await Patient.findById(pateintId);

        const whatsappMessage =
          "*Seizure Alert*\nEmergency Alert: "+ patient.firstName+ " is currently experiencing a seizure. Please take immediate action and provide necessary medical assistance.!";

        for (let i = 0; i < patient.emergencyContact.length; i++) {
          sendWhatsappMessage(patient.emergencyContact[i].phone, whatsappMessage);
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
