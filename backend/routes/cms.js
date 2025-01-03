const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
    const { page = 1, size = 10, search = "" } = req.query;
    const limit = parseInt(size, 10);
    const offset = (parseInt(page, 10) - 1) * limit;
  
    const query = `
      SELECT * FROM words
      WHERE wordFirstLang LIKE ? OR sentenceFirstLang LIKE ?
        OR wordSecondLang LIKE ? OR sentenceSecondLang LIKE ?
      LIMIT ? OFFSET ?
    `;
  
    const searchParam = `%${search}%`;
  
    db.all(
      query,
      [searchParam, searchParam, searchParam, searchParam, limit, offset],
      (err, rows) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
  
        // Get the total count for pagination
        db.get(
          `
          SELECT COUNT(*) as totalCount FROM words
          WHERE wordFirstLang LIKE ? OR sentenceFirstLang LIKE ?
            OR wordSecondLang LIKE ? OR sentenceSecondLang LIKE ?
        `,
          [searchParam, searchParam, searchParam, searchParam],
          (countErr, countResult) => {
            if (countErr) {
              return res.status(500).json({ error: countErr.message });
            }
  
            res.json({ data: rows, totalCount: countResult.totalCount });
          }
        );
      }
    );
  });
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const {
      wordFirstLang,
      sentenceFirstLang,
      wordSecondLang,
      sentenceSecondLang,
    } = req.body;
  
    const query = `
      UPDATE words
      SET wordFirstLang = ?, sentenceFirstLang = ?, wordSecondLang = ?, sentenceSecondLang = ?
      WHERE id = ?
    `;
  
    db.run(
      query,
      [wordFirstLang, sentenceFirstLang, wordSecondLang, sentenceSecondLang, id],
      function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
  
        if (this.changes === 0) {
          return res.status(404).json({ message: "Word not found" });
        }
  
        res.json({ message: "Word updated successfully" });
      }
    );
  });
  

module.exports = router;
