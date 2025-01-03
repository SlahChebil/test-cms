const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const wordsRouter = require("./routes/cms");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/words", wordsRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
