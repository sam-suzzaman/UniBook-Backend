const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const GraduatesSchema = new mongoose.Schema(
    {
        collegeName: {
            type: String,
        },
        thumb: {
            type: String,
        },
        batch: {
            type: String,
        },
        session: {
            type: String,
        },
    },
    { timestamps: true }
);

const GraduatesModel = mongoose.model("Graduate", GraduatesSchema);
module.exports = GraduatesModel;
