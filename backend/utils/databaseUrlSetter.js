//does not work like this. if reads env while trying to get databaseurl it does not search the environment space.
const { connectionUrl } = require('../db/connectionUrl');

require('dotenv').config();


process.env.DATABASE_URL = connectionUrl;