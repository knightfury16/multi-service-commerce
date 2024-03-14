const express = require("express");
const { SetValue, GetAllValues, GetValue } = require("./repository");

const app = express();

// Parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

// Route to retrieve the value from the table
app.get("/getValues", async (req, res) => {
  try {
    const result = await GetAllValues();
    res.status(200).json({ result });
  } catch (err) {
    console.error("Error retrieving value from database", err);
    res.status(500).send("Error retrieving value from database");
  }
});

app.post("/setValue", async (req, res) => {
  try {
    const { value } = req.body;
    if (!value) {
      return res.status(400).json({ error: "Value is required" });
    }
    const result = await SetValue(value);
    res.status(201).send("Value Created Successfully!");
  } catch (error) {
    console.error("Error inserting value:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/getValue", async (req, res) => {
  try {
    const { value } = req.query;
    if (!value) {
      return res.status(400).json({ error: "Value is required" });
    }
    const result = await GetValue(value);
    res.status(200).send(result);
  } catch (error) {
    console.error("Error retrieving value from database", err);
    res.status(500).send("Error retrieving value from database");
  }
});

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
