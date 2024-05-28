require('dotenv').config();

const username = process.env.PG_USER || process.env.DEAFULT_DB_USER;
const password = process.env.PG_PASSWORD || process.env.DEAFULT_DB_PASSWORD;
const databaseName = process.env.PG_DATABASE || process.env.DEAFULT_DB_DATABASE;
const port = process.env.PG_PORT || process.env.DEAFULT_DB_PORT;
const host = process.env.PG_HOST !== undefined ? process.env.PG_HOST : process.env.DEAFULT_DB_HOST; // Optional check for Docker environment (if applicable)

const connectionUrl = `postgresql://${username}:${password}@${host}:${port}/${databaseName}`;

console.log("Database connection string: ",connectionUrl);

exports.connectionUrl = connectionUrl;
