const express = require("express");
const app = express();
const { readFile } = require("fs");

app.use(express.json());

app.get("/date", function (req, res) {
  const now = new Date();
  res.send(now);
});

app.get("/read", function (req, res) {
  readFile("lorem.txt", "utf8", (err, data) => {
    if (err) {
      res.status(500);
    }

    res.send(data);
  });
});

app.post("/hello", (req, res) => {
  if (req.body.name) {
    res.send(`Buenos dias ${req.body.name}`);
  } else {
    res.send("Buenos dias desconocido!");
  }
});

app.listen(3000);
