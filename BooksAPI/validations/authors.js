const { check } = require("express-validator");

const authorsValidation = [
  check("name", "Author name must be valid").isString().isLength({ min: 1, max: 100 }),
  check("country", "Country must be valid").isString().isLength({ min: 1, max: 50 }),
];

module.exports = { authorsValidation };
