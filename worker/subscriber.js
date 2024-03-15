import redisClient from "./redisClient.js";

const subscriber = redisClient.duplicate();

(async () => {   
    subscriber.on('error', err => console.error(err));
    await subscriber.connect();
    console.log("Subscriber created successfully.");
})()


export default subscriber