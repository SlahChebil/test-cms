const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Create or open SQLite database
const db = new sqlite3.Database(path.resolve(__dirname, "./words.db"), (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Create the table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS words (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     wordFirstLang TEXT,
     sentenceFirstLang TEXT,
     wordSecondLang TEXT,
     sentenceSecondLang TEXT,
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
});

module.exports = db;
