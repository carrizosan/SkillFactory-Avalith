const Router = require("express");
const router = new Router();
const { mySQLConnection: db } = require("../database/initializeDatabase");
const { validationResult } = require("express-validator");
const { booksValidation } = require("../validations/books");

/**
 * Create book endpoint
 */
router.post("/books", booksValidation, (req, res) => {
  const { name, authorId, isbn } = req.body;

  // Check request body validations
  const validations = validationResult(req);

  if (!validations.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validations errors",
      error: validations.array(),
    });
  }

  // Check if author exists
  db.query("SELECT id FROM author WHERE id = ?", [authorId], (error, results) => {
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
        message: "Author not found",
        response: {},
      });
    }

    // Create new book
    const newBook = { name, author_id: authorId, isbn };

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
});

/**
 * Get all books endpoint
 */
router.get("/books", (req, res) => {
  let response = [];
  db.query(
    "SELECT b.id 'id', b.name 'name', isbn, author_id, a.name 'author', country FROM books b INNER JOIN author a ON b.id = a.id ORDER BY name",
    (error, results) => {
      if (error) {
        return res.status(400).json({
          success: false,
          message: "There is an error",
          response: {},
        });
      }

      // Format the response object
      results.forEach((book) => {
        response.push({
          id: book.id,
          name: book.name,
          isbn: book.isbn,
          author: {
            id: book.author_id,
            name: book.author,
            country: book.country,
          },
        });
      });

      return res.status(200).json({
        success: true,
        message: "Books list",
        response,
      });
    }
  );
});

/**
 * Get by Id endpoint
 */
router.get("/books/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT b.id 'id', b.name 'name', isbn, author_id, a.name 'author', country FROM books b INNER JOIN author a ON b.id = a.id WHERE b.id = ?",
    [id],
    (error, results) => {
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

      // Format response object
      const response = {
        id: results[0].id,
        name: results[0].name,
        isbn: results[0].isbn,
        author: {
          id: results[0].author_id,
          name: results[0].author,
          country: results[0].country,
        },
      };

      return res.status(200).json({
        success: true,
        message: "Book",
        response,
      });
    }
  );
});

/**
 * Update book endpoint
 */
router.put("/books/:id", booksValidation, (req, res) => {
  const { id } = req.params;
  const { name, authorId, isbn } = req.body;

  // Check validations
  const validations = validationResult(req);

  if (!validations.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validations errors",
      error: validations.array(),
    });
  }

  // Check if author exists
  db.query("SELECT id FROM author WHERE id = ?", [authorId], (error, results) => {
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
        message: "Author not found",
        response: {},
      });
    }

    // Execute update
    db.query(
      "UPDATE books SET name = ?, author_id = ?, isbn = ? WHERE id = ? ",
      [name, authorId, isbn, id],
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
          response: { id, name, authorId, isbn },
        });
      }
    );
  });
});

/**
 * Delete book endpoint
 */
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
