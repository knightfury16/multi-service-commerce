require('dotenv').config();

const username = process.env.PG_USER || 'postgres';
const password = process.env.PG_PASSWORD || '1234554321';
const databaseName = process.env.PG_DATABASE || 'cds_test';
const port = process.env.PG_PORT || 5432;
const isDocker = process.env.PG_HOST !== undefined ? 'true' : 'false'; // Optional check for Docker environment (if applicable)

const host = isDocker === 'true' ? 'postgres' : 'localhost'; // Use 'postgres' in Docker, 'localhost' otherwise

const connectionUrl = `postgresql://${username}:${password}@${host}:${port}/${databaseName}`;

console.log("Database connection string: ",connectionUrl);

exports.connectionUrl = connectionUrl;
