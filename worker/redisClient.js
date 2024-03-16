import { createClient } from "redis";
import {redisHost,redisPort} from "./keys.js"

const redisClient = createClient({
  socket: {
    host: redisHost,
    port: redisPort,
    reconnectStrategy: () => 1000
  }
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

(async () => {
    await redisClient.connect();
    console.log("Redis client connected successfully.");
  })();

export default redisClient;
