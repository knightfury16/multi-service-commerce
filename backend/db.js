const { Pool } = require("pg");


const MyPool = new Pool({
  user: "postgres",
  host: "postgres",
  database: "calculated_values", // Replace with your database name
  password: "admin", // Empty password for default PostgreSQL setup
  port: 5432,
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
