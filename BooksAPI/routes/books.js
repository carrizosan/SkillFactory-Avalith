const Router = require("express");
const router = new Router();
const { mySQLConnection: db } = require("../database/initializeDatabase");
const { validationResult } = require("express-validator");
const { booksValidation } = require("../validations/books");

// Create Book
router.post("/books", booksValidation, (req, res) => {
  const { name, author, isbn } = req.body;

  // Check validations
  const validations = validationResult(req);

  if (!validations.isEmpty()) {
    return res.status(400).json({
      success: false,
      msg: "Validations errors",
      error: validations.array(),
    });
  }

  const newBook = { name, author, isbn };

  db.query("INSERT INTO books SET ?", newBook, (error, results) => {
    if (error) {
      return res.status(400).json({
        success: false,
        message: "There is an error",
        response: {},
      });
    }

    return res.status(201).json({
      success: true,
      message: "Book created",
      response: { id: results.insertId, ...newBook },
    });
  });
});

// Get all books
router.get("/books", (req, res) => {
  db.query("SELECT id, name, author, isbn FROM books ORDER BY name", (error, results) => {
    if (error) {
      return res.status(400).json({
        success: false,
        message: "There is an error",
        response: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: "Books list",
      response: results,
    });
  });
});

// Get one book by Id
router.get("/books/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT id, name, author, isbn FROM books WHERE id = ?", [id], (error, results) => {
    if (error) {
      return res.status(400).json({
        success: false,
        message: "There is an error",
        response: {},
      });
    }

    if (!results[0]) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        response: {},
      });
    }
    return res.status(200).json({
      success: true,
      message: "Book",
      response: results[0],
    });
  });
});

// Modify a book
router.put("/books/:id", booksValidation, (req, res) => {
  const { id } = req.params;
  const { name, author, isbn } = req.body;

  // Check validations
  const validations = validationResult(req);

  if (!validations.isEmpty()) {
    return res.status(400).json({
      success: false,
      msg: "Validations errors",
      error: validations.array(),
    });
  }

  db.query(
    "UPDATE books SET name = ?, author = ?, isbn = ? WHERE id = ? ",
    [name, author, isbn, id],
    (error, results) => {
      if (error) {
        return res.status(400).json({
          success: false,
          message: "There is an error",
          response: {},
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Book not found",
          response: {},
        });
      }
      return res.status(200).json({
        success: true,
        message: "Book updated",
        response: { id, name, author, isbn },
      });
    }
  );
});

// Delete a book
router.delete("/books/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM books WHERE id = ? ", [parseInt(id)], (error, results) => {
    if (error) {
      return res.status(400).json({
        success: false,
        message: "There is an error",
        response: {},
      });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        response: {},
      });
    }
    return res.status(200).json({
      success: true,
      message: "Book deleted",
      response: id,
    });
  });
});

module.exports = router;
