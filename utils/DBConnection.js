// DBConnectionHandler.js
require("dotenv").config();
const mongoose = require("mongoose");

async function DBConnectionHandler() {
    try {
        await mongoose.connect(process.env.DB_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("db connected successfully");
    } catch (err) {
        console.log(`There is an error id DB: ${err.message}`);
    }
}

module.exports = DBConnectionHandler;
