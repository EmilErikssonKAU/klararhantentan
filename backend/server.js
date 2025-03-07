require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const { logEvents } = require("./middleware/logger");
const PORT = process.env.PORT || 3500;

// MIDDDLEWARE EXECUTION ORDER
// 1.

// connect to the database
connectDB();

// custom middleware for logging
app.use(logger);

app.use(cors(corsOptions));

// middleware allowing app to use and parse json data
app.use(express.json());

app.use(cookieParser());

// define location of static-files
app.use("/", express.static(path.join(__dirname, "/public")));

// import routes
app.use("/", require("./routes/root"));
app.use("/users", require("./routes/userRoutes"));
app.use("/tentor", require("./routes/tentaRoutes"));
app.use("/auth", require("./routes/authRoutes"));

// handle remaining requests
app.all("*", (req, res) => {
  res.status(404);
  // standard http/https request
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "..", "views", "404.html"));
  }
  // if html isn't accepted but json is
  else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  }
  // if nothing is accepted
  else {
    res.type("txt").send("404 Not Found");
  }
});

// use the imported errorHandler
app.use(errorHandler);


mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  // listen for incoming requests
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
