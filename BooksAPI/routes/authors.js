const Router = require("express");
const router = new Router();
const { mySQLConnection: db } = require("../database/initializeDatabase");
const { validationResult } = require("express-validator");
const { authorsValidation } = require("../validations/authors");

/**
 * Create author endpoint
 */
router.post("/authors", authorsValidation, (req, res) => {
  const { name, country } = req.body;

  // Check request body validations
  const validations = validationResult(req);

  if (!validations.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validations errors",
      error: validations.array(),
    });
  }

  const newAuthor = { name, country };

  db.query("INSERT INTO author SET ?", newAuthor, (error, results) => {
    if (error) {
      return res.status(400).json({
        success: false,
        message: "There is an error",
        response: {},
      });
    }

    return res.status(201).json({
      success: true,
      message: "Author created",
      response: { id: results.insertId, ...newAuthor },
    });
  });
});

/**
 * Get all authors endpoint
 */
router.get("/authors", (req, res) => {
  db.query("SELECT id, name, country FROM author ORDER BY name", (error, results) => {
    if (error) {
      return res.status(400).json({
        success: false,
        message: "There is an error",
        response: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: "Authors list",
      response: results,
    });
  });
});

/**
 * Get by Id endpoint
 */
router.get("/authors/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT id, name, country FROM author WHERE id = ?", [id], (error, results) => {
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

    return res.status(200).json({
      success: true,
      message: "Author",
      response: results[0],
    });
  });
});

/**
 * Update book endpoint
 */
router.put("/authors/:id", authorsValidation, (req, res) => {
  const { id } = req.params;
  const { name, country } = req.body;

  // Check validations
  const validations = validationResult(req);

  if (!validations.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validations errors",
      error: validations.array(),
    });
  }

  db.query("UPDATE author SET name = ?, country = ? WHERE id = ? ", [name, country, id], (error, results) => {
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
        message: "Author not found",
        response: {},
      });
    }
    return res.status(200).json({
      success: true,
      message: "Author updated",
      response: { id, name, country },
    });
  });
});

module.exports = router;
