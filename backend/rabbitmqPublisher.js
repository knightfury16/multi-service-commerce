const { createRabbitConnection } = require("./rabbitConnection.js");
let channel = null;

(async () => {
  try {
    const connection = await createRabbitConnection();
    channel = await connection.createChannel();
    console.log("rabbitmq channel initialize");
  } catch (error) {
    console.log("Error initializing rabbitmq channel");
    throw error;
  }
})();

async function publishMessage(message, queueName = "default") {
  if (!channel || channel == null) {
    throw new Error(
      "RabbitMQ channel not initialized. Call initializeChannel first.",
    );
  }

  try {
    await channel.assertQueue(queueName, { durable: false });
    await channel.sendToQueue(queueName, Buffer.from(message));
    console.log(`Message '${message}' published to channel '${queueName}'`);
  } catch (error) {
    console.error(`Error publishing message to channel '${queueName}':`, error);
    throw error;
  }
}

module.exports = { publishMessage };
