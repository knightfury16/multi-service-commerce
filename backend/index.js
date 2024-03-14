const express = require("express")
const pool = require("./db")

const app = express()

app.get('/', (req, res) => {
	res.send("Hello world")
})

// Route to retrieve the value from the table
app.get("/getValue", async (req, res) => {
	try {
		const result = await pool.query(`SELECT * FROM "calculated_values"`);
		const value = result.rows[1].value;
		res.send(`The calculated value is: ${value}`);
	} catch (err) {
		console.error("Error retrieving value from database", err);
		res.status(500).send("Error retrieving value from database");
	}
});

app.listen(3000, () => {
	console.log("Server started at port 3000")
})
