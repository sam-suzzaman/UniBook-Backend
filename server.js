const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = require("./app");

// DB Connection

// Server Port
const port = process.env.PORT || 2000;

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
