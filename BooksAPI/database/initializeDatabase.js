const mysql = require("mysql");
const { DB_CREDENTIALS } = require("../config/config");

const mySQLConnection = mysql.createConnection(DB_CREDENTIALS);

const booksQuery = `CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    ISBN VARCHAR(13) NOT NULL UNIQUE
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
  mySQLConnection.query(booksQuery);
};

module.exports = { initialize, mySQLConnection };
