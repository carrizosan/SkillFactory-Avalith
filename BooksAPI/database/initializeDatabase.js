const mysql = require("mysql");
const { DB_CREDENTIALS } = require("../config/config");

const mySQLConnection = mysql.createConnection(DB_CREDENTIALS);

const authorsQuery = `CREATE TABLE IF NOT EXISTS author (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  country VARCHAR(50) NOT NULL
);`;

const booksQuery = `CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    ISBN VARCHAR(13) NOT NULL UNIQUE,
    author_id INT NOT NULL,
    FOREIGN KEY (author_id)
        REFERENCES author (id)
        ON DELETE RESTRICT
);`;

const initialize = () => {
  mySQLConnection.connect((err) => {
    if (err) {
      console.error("Error connecting database: " + err.stack);
      return;
    }
    console.log("Connected to database as id " + mySQLConnection.threadId);
  });

  // All tables creation here
  mySQLConnection.query(authorsQuery);
  mySQLConnection.query(booksQuery);
};

module.exports = { initialize, mySQLConnection };
