const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = require("./app");
const DBConnectionHandler = require("./utils/DBConnection");

// DB Connection
DBConnectionHandler();

// Server Port
const port = process.env.PORT || 2000;

// 404 Error handler
app.use("*", (req, res) => {
    res.status(404).json({ message: "Not Found" });
});

// Error Handeling Middleware(default synchronous error handling middleware from express)
app.use((err, req, res, next) => {
    if (res.headersSent) {
        next("There was a problem");
    } else {
        if (err.message) {
            res.status(err.status || 500).json({
                status: false,
                message: "Operation falied",
                error: err.message,
            });
        } else {
            res.status(500).json({
                status: false,
                message: "Operation falied",
                error: "Something went wrong",
            });
        }
    }
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
