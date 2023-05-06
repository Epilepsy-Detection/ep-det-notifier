const axios = require('axios');

module.exports.sendWhatsappMessage = async (phoneNumber,accessToken,patientId) => {
    try {
      const response = await axios.post(
        `https://graph.facebook.com/v11.0/${process.env.PHONE_NUMBER_ID}/messages?access_token=${accessToken}`,
        {
            "messaging_product": "whatsapp",
            "to": `{${phoneNumber}}`,
            "type": "text",
            // "template": {
            //     "name": "epcare",
            //     "language": {
            //         "code": "en_US"
            //     },
            //     "components": [
            //         {
            //           "type": "body",
            //           "parameters": [
            //               {
            //                   "type": "text",
            //                   "text": `${patientId}`
            //               }
            //           ]}]
            // },
            "text": {
                "body": `Patient ${patientId} has been detected with a seizure.`

        }}
      );
  
      console.log(`Message sent to ${phoneNumber}. Response:`, response.data);
    } catch (error) {
      console.error(`Error sending message to ${phoneNumber}:`, error.response.data);
    }
  }
