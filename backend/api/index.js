const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("../middleware/errorMiddleware");
const connectDB = require("../config/db");
const port = process.env.PORT || 5000;
const cors = require("cors");

connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("../routes/goalRoutes"));

app.get("/", (req, res) => {
  res.send(`
  <b>Hello on goal-setter-app</b><br><br>
  Database: MongoDB <br>
  Author: Paweł Chudecki <br>
  Route: /api/goals
  `);
});

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;
