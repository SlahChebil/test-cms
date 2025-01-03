const db = require("./db");
const fs = require("fs");

const seedDatabase = () => {
  const data = JSON.parse(fs.readFileSync("db.json", "utf8"));
  console.log(data);
  console.log("databse::"+db)
  const query = `
    INSERT INTO words (wordFirstLang, sentenceFirstLang, wordSecondLang, sentenceSecondLang)
    VALUES (?, ?, ?, ?)
  `;
  data.forEach((item) => {
    db.run(
      query,
      [
        item.wordFirstLang,
        item.sentenceFirstLang,
        item.wordSecondLang,
        item.sentenceSecondLang,
      ],
      (err) => {
        if (err) {
          console.error("Error inserting data:", err.message);
        }
      }
    );
  });

  console.log("Database seeded successfully.");
};

seedDatabase();
