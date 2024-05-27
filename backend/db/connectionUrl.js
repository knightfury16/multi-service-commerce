require('dotenv').config();

const username = process.env.PG_USER || 'postgres';
const password = process.env.PG_PASSWORD || '1234554321';
const databaseName = process.env.PG_DATABASE || 'cds_test';
const port = process.env.PG_PORT || 5432;
const host = process.env.PG_HOST !== undefined ? process.env.PG_HOST : 'localhost'; // Optional check for Docker environment (if applicable)

const connectionUrl = `postgresql://${username}:${password}@${host}:${port}/${databaseName}`;

console.log("Database connection string: ",connectionUrl);

exports.connectionUrl = connectionUrl;
