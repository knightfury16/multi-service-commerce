const { Pool } = require("pg")

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'calculated_values', // Replace with your database name
	password: 'admin', // Empty password for default PostgreSQL setup
	port: 5432,
});

// Create a table named calculated_values if it doesn't already exist
pool.query(
	"CREATE TABLE IF NOT EXISTS calculated_values (id SERIAL PRIMARY KEY, value INTEGER)"
);

// Insert a value into the calculated_values table
pool.query("INSERT INTO calculated_values (value) VALUES ($1)", [50]);

module.exports = pool
