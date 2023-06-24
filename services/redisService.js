const redis = require("redis");

let client;

async function connect() {
  // Create a Redis client and connect to Redis server
  client = redis.createClient();

  // Handle Redis errors
  client.on("error", (err) => {
    console.error("Redis Client Error", err);
  });

  await client.connect();
  console.log("Redis client connected");
}
// Set a contact number with its prediction value
module.exports.setPatient = async (profileId, label, timestamp) => {
  await client.hSet(profileId, {
    label: label,
    timestamp: timestamp,
  });
  await client.expire(profileId, 500);
  console.log(
    `Prediction value for patient ${profileId} is set to ${label} at ${timestamp}`
  );
};

// Get a contact number with its prediction value
module.exports.getPatient = async (profileId) => {
  const value = await client.hGetAll(profileId);
  if (Object.keys(value).length === 0) return null;
  return value;
};

// Delete a contact number with its prediction value
module.exports.deletePatient = async (profileId) => {
  await client.del(profileId);
  console.log(`Prediction value for patient ${profileId} is deleted`);
};

module.exports.patientExists = async (profileId) => {
  const result = await client.exists(profileId);
  return result;
};

connect();
