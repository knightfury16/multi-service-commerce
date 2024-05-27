const { connectionUrl } = require('../db/connectionUrl');

require('dotenv').config();


process.env.DATABASE_URL = connectionUrl;