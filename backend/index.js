require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const notesRouter = require("./routes/notes");
const cors = require("cors");
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/notes", notesRouter);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});