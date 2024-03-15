import { createClient } from "redis";

const redisClient = createClient({
  socket: {
    host: "redis",
    port: 6379,
    reconnectStrategy: () => 1000
  }
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.connect();

export default redisClient;
