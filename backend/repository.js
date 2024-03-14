const poolInstance = require("./db");


function GetAllValues() {
  return new Promise((resolve, reject) => {
    poolInstance.query("SELECT * FROM calculated_values", (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
}

function GetValue(key) {
  return new Promise((resolve, reject) => {
    poolInstance.query(
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

async function SetValue(key) {
  try {
    const result = await poolInstance.query('INSERT INTO calculated_values (value) VALUES ($1)',[key]);
    return result;
  } catch (error) {
    throw error
  }
}

module.exports = { SetValue, GetValue, GetAllValues };
