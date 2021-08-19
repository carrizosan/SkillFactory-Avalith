const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const db = require("./database/initializeDatabase");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.initialize();

// Express Routes
app.use("/api", require("./routes/books"));

module.exports = { app, port };
