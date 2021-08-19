const { check } = require("express-validator");

const booksValidation = [
  check("name", "Book name must be valid").isString().isLength({ min: 1, max: 100 }),
  check("author", "Author must be valid").isString().isLength({ min: 1, max: 100 }),
  check("isbn", "ISBN must have a valid format").not().isEmpty().isISBN(),
];

module.exports = { booksValidation };
