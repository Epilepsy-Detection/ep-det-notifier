const axios = require('axios');

module.exports.sendWhatsappMessage = async (phoneNumber,message) => {
    try {
      const response = await axios.post(
        `https://graph.facebook.com/${process.env.CLOUD_API_VERSION}/${process.env.PHONE_NUMBER_ID}/messages?access_token=${process.env.CLOUD_API_ACCESS_TOKEN}`,
        {
          messaging_product: "whatsapp",
          preview_url: false,
          to: phoneNumber,
          type: "text",
          text: {
              "body": message
          },
          'whatsapp': {
            'sender': 'epicare',
            'policy': 'fallback'
        }
        }
      );
      console.log(`Message sent to ${phoneNumber}. Response:`, response.data);
    } catch (error) {
      console.error(`Error sending message to ${phoneNumber}:`, error.response.data);
    }
  }
