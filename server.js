const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");

// Get config
dotenv.config({ path: "./config/config.env" });

// Connect the database
connectDB();

// Init app
const app = express();

// Get the routes
const transactions = require("./routes/transactions");

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Init morgan
if ((process.env.NODE_ENV = "development")) app.use(morgan("dev"));

// Set api routes
app.use("/api/v1/transactions", transactions);

// Use static for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("/", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

// Get the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} at http://localhost:${PORT}`.blue
      .bold
  )
);
