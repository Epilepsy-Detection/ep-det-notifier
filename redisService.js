const redis = require('redis');

let client;
//TODO : handle redis logs not shown in the console
async function connect() {
  // Create a Redis client and connect to Redis server
  client = redis.createClient();

  // Handle Redis errors
  client.on('error', (err) => {
    console.error('Redis Client Error', err);
  });

  await client.connect();
  console.log('Redis client connected');
}
// Set a contact number with its prediction value
module.exports.setContact= async(contactNumber, predictionValue)=> {
    await client.set(contactNumber, predictionValue, (err, reply) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Prediction value stored for contact number ${contactNumber}`);
      }
    });
    console.log("sallam");
  }

// Get a contact number with its prediction value
module.exports.getContact = async(contactNumber, callback)=> {

    await client.get(contactNumber, (err, reply) => {
        if (err) {
          console.error(err);
          callback(null);
        } else {
          callback(reply);
        }
      });
  }

// Delete a contact number with its prediction value
module.exports.deleteContact= async (contactNumber) =>{
    await client.del(contactNumber, (err, reply) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Prediction value for contact number ${contactNumber} is deleted`);
      }
    });
  }

connect();  

