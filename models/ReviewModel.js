const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
    {
        collegeID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "College",
            // type: Number,
            required: [true, "College info required"],
        },
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            // type: Number,
            required: [true, "user info is required"],
        },
        rating: {
            type: Number,
            required: [true, "review must have a rating"],
        },
        comment: {
            type: String,
            required: [true, "review must have a comment"],
        },
    },
    { timestamps: true }
);

const ReviewModel = mongoose.model("review", ReviewSchema);
module.exports = ReviewModel;
