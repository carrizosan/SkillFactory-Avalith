const { check } = require("express-validator");

const booksValidation = [
  check("name", "Book name must be valid").isString().isLength({ min: 1, max: 100 }),
  check("authorId", "Author must be valid").isInt({ min: 1 }),
  check("isbn", "ISBN must have a valid format").not().isEmpty().isISBN(),
];

module.exports = { booksValidation };
