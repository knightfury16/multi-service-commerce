const amqplib = require("amqplib");
const { amqpHost, amqpPort, amqpUser, amqpPassword } = require("../keys.js");

const amqpUri = `amqp://${amqpUser}:${amqpPassword}@${amqpHost}:${amqpPort}`;

async function createRabbitConnection() {
  try {
    const connection = await amqplib.connect(amqpUri);
    console.log("Connected to rabbitmq successfully");
    return connection;
  } catch (error) {
    console.error("Error connecting to rabbitmq");
    throw error;
  }
}

module.exports = { createRabbitConnection };
