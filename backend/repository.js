const pool = require("./db");

export function GetAllValues() {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM calculated_values", (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
}

export function GetValue(key) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM calculated_values WHERE value=($1)",
      [key],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
      },
    );
  });
}

export function SetValue(key) {
  return new Promise((resolve, reject) => {
    // Insert a value into the calculated_values table
    pool.query(
      "INSERT INTO calculated_values (value) VALUES ($1)",
      [key],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve("Value inserted successfully!", result);
        }
      },
    );
  });
}
