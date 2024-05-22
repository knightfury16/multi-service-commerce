const jwt = require('jsonwebtoken');
const prisma = require('../db/prisma');
const { redisClient } = require('../utils/redisClient');
const { publishMessage } = require('../utils/rabbitmqPublisher');

const rateController = async (req, res, next) => {
    try {
        /////temp
        let counter = 1;
        let user = req.user;

        if (user == null || user == undefined) {
            user = {
                "id": 1,
                "name": "Morganica Sherlock",
                "email": "msherlock0@fema.gov",
                "password": "8kKODedKDshk",
                "phoneNum": "597-693-0254",
                "dateOfBirth": null,
                "gender": null,
                "address": null,
                "role": "BUYER"
            };
            console.log("USER NOT FOUND SETTING MANUALLY");
            // throw new Error('RC: Please authenticate!');
        }

        let userKey = `USER1`;

        // if (userkey == null || userKey == undefined) {
        //     throw new Error('userid not found to RC');
        // }

        // const previousCall = await redisClient.HGET(userkey);

        // console.log("PREVIOUS CALL::", previousCall);

        publishMessage(`${userKey}:${counter++}`, "RATE_CONTROL");

        next();
    } catch (error) {
        res.status(401).send({ Error: `${error.message}` });
    }
};

module.exports = { rateController };
