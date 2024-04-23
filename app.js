const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

app.use(cookieParser(process.env.COOKIE_SECRET));

// Middlewares
app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:5173", "*"],
        methods: ["GET,POST,DELETE,PUT,PATCH"],
        credentials: true,
    })
);

// Importing Routers
const AuthRouter = require("./routes/v1/AuthRouter");
const UserRouter = require("./routes/v1/UserRouter");
const CollegeRouter = require("./routes/v1/CollegeRouter");

// Middlewares
app.use(express.json());
app.use(cors());

// Connecting Routers
app.use("/api/v1/college", CollegeRouter);
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/user", UserRouter);

app.get("/", (req, res) => {
    res.send(`<h1 align="center">--- Uni-Book Server is Running ---</h1>`);
});

module.exports = app;
