const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const { xss } = require("express-xss-sanitizer");
const decodeRequestBody = require("./middleware/decodeHtmlEntities");
const opportunitiesRoutes = require("./routes/opportunities");

require("dotenv").config();
const test = require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(decodeRequestBody);

// Routes
app.use("/opportunities", opportunitiesRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/build", "index.html"));
});

// Database connection
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@gls-chall.xroab.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
