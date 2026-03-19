const express = require("express");
const Database = require("better-sqlite3");
const registerApi = require("./api");

const app = express();
const PORT = 3000;

const database = new Database("./SpillKurs.db");
registerApi(app, database);

app.get("/", (req, res) => {
	res.json({ message: "Server is running" });
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
