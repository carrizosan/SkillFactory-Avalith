const bCrypt = require("bcrypt");

const users = [
  {
    username: "admin",
    password: bCrypt.hashSync("qwerty", 10),
    accessToken: null,
  },
];

module.exports = { users };
