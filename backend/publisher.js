const {redisClient} = require("./redisClient.js")

const publisher = redisClient.duplicate();

(async () => {   
    publisher.on('error', err => console.error(err));
    await publisher.connect();
    console.log("Subscriber created successfully.");
})()


module.exports = {publisher}