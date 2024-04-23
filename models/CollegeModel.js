const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const CollegeSchema = new mongoose.Schema(
    {
        collegeName: {
            type: String,
        },
        collegeThumbnail: {
            type: String,
        },
        establishedOn: {
            type: String,
        },
        rating: {
            type: Number,
        },
        collegeInfo: {
            type: String,
        },
        addmissionProcess: [{}],
        addmissionDates: [{}],
        researches: {},
        events: [{}],
        sports: [{}],
    },
    { timestamps: true }
);

const CollegeModel = mongoose.model("College", CollegeSchema);
module.exports = CollegeModel;
