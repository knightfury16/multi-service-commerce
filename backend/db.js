const { Pool } = require("pg");

// Create a table named calculated_values if it doesn't already exist
// pool.query(
//   "CREATE TABLE IF NOT EXISTS calculated_values (id SERIAL PRIMARY KEY, value INTEGER)",
// );
//
// // Insert a value into the calculated_values table
// pool.query("INSERT INTO calculated_values (value) VALUES ($1)", [50]);

function connectToDataBase(callback) {
  var pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "calculated_values", // Replace with your database name
    password: "admin", // Empty password for default PostgreSQL setup
    port: 5432,
  });

  checkConnectionStatus(pool, callback);
}

function checkConnectionStatus(pool, callback) {
  // Attempt to connect to the database
  pool.connect((err, _client, release) => {
    if (err.code == "3D000") {
      pool.end(); // Close the pool to release resources
      throw "Database does not exists. Create manually for now or check the database string name.";
      //--TODO: Create database automatically if it does not exists. Write a some sort of shell script?
    } else if (err) {
      console.error("Error connecting to the database:", err);
      pool.end(); // Close the pool to release resources
    } else {
      console.log("Successfully connected to the database");
      release(); // Release the client back to the pool
      callback(pool);
    }
  });
}

connectToDataBase((pool) => {
  module.exports = pool;
});
