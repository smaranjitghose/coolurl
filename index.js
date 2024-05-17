require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware to process incoming HTTP request data in JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use Helmet to help secure Express apps with various HTTP headers
app.use(helmet());

// Global logging middleware
app.use((req, res, next) => {
    let logData = `${new Date().toISOString()} | ${req.url} | ${req.method}`;
    console.log(logData);
    next();
});

// Local Module or Custom Module
const { connectDB } = require("./db");
connectDB();

// Import Router
const mainRouter = require("./routes/mainRouter");
const apiRouter = require("./routes/apiRouter");

// Mount Router
app.use("/", mainRouter);
app.use("/api/v1", apiRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT} ...`);
});
