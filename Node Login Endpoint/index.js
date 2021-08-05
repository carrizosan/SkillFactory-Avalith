const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bCrypt = require("bcrypt");
const PORT = 3000;
const { users } = require("./database/users");
const { SECRET_KEY } = require("./config/key");
const { authUser } = require("./helpers/auth/auth");

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Check required body fields
  if (!username || !password) {
    res.status(401).send("Username and password fields are required");
  }
  // Check if user exists
  const dbUser = users.find((user) => user.username === username);

  if (dbUser) {
    // Compare passwords
    if (await bCrypt.compare(password, dbUser.password)) {
      // Create new token
      const accessToken = jwt.sign(dbUser, SECRET_KEY);
      dbUser.accessToken = accessToken;

      res.status(200).json({
        msg: "User logged in",
        accessToken,
      });
    } else {
      res.status(401).send("Username or password are wrong");
    }
  } else {
    res.status(401).send("Username or password are wrong");
  }
});

app.post("/hello", authUser, (req, res) => {
  res.send(`Welcome ${req.user.username}`);
});

app.listen(PORT, () => console.log(`Server listening port ${PORT}`));
