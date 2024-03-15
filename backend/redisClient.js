const {createClient} = require("redis")

const redisClient = createClient({
  socket: {
    host: "redis",
    port: 6379,
    reconnectStrategy: () => 1000
  }
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

(async () => {
    await redisClient.connect();
    console.log("Redis client connected successfully.");
  })();

module.exports = {redisClient}
