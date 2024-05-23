const jwt = require('jsonwebtoken');
const prisma = require('../db/prisma');
const { redisClient } = require('../utils/redisClient');
const { publishMessage } = require('../utils/rabbitmqPublisher');
const { MAX_ALLOWED_CALL } = require('../utils/constants');

const rateController = async (req, res, next) => {
    try {
        let user = req.user;

        if (user == null || user == undefined) {
            throw new Error('RC: Please authenticate!');
        }

        let userKey = `USER-${user.id}`;

        //check if we have any value in redis with this userKey
        const previousCall = await redisClient.GET(userKey);

        //we have and its value is exceding max allwoed call
        if(previousCall != null && parseInt(previousCall) > MAX_ALLOWED_CALL){
            throw new Error("You exceeded your limit. Please try again later");
        }

        const publishMsgString = `${userKey}:${previousCall}`

        await publishMessage(publishMsgString, "RATE_CONTROL");

        next();
    } catch (error) {
        res.status(401).send({ Error: `${error.message}` });
    }
};

module.exports = { rateController };
