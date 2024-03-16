const { Pool } = require("pg");
const { pgUser, pgHost, pgDatabase, pgPassword, pgPort } = require("./keys.js");


const MyPool = new Pool({
  user: pgUser,
  host: pgHost,
  database: pgDatabase, // Replace with your database name
  password: pgPassword, // Empty password for default PostgreSQL setup
  port: pgPort,
});


function connectToDataBase(callback) {
  var pool = MyPool;
  checkConnectionStatus(pool, callback);
}

function checkConnectionStatus(pool, callback) {
  // Attempt to connect to the database
  pool.connect((err, _client, release) => {
    if (err) {
      if (err.code && err.code == "3D000") {
        throw "Database does not exists. Create manually for now or check the database string name.";
        //--TODO: Create database automatically if it does not exists. Write a some sort of shell script?
      }

      console.error("Error connecting to the database:", err);
      pool.end(); // Close the pool to release resources
    } else {
      console.log("Successfully connected to the database");
      release(); // Release the client back to the pool
      callback(pool);
    }
  });
}


connectToDataBase(async (pool) => {
  // Create a table named calculated_values if it doesn't already exist
  await pool.query(
    "CREATE TABLE IF NOT EXISTS calculated_values (id SERIAL PRIMARY KEY, value INTEGER)",
  );
});

module.exports = MyPool
