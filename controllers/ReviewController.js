const ReviewModel = require("../models/ReviewModel");

exports.addReviewHandler = async (req, res) => {
    const { userID, collegeID, rating, comment } = req.body;
    try {
        if (userID && collegeID && rating && comment) {
            const isReviewExsits = await ReviewModel.findOne({
                collegeID,
                userID,
            });

            if (isReviewExsits) {
                result = await ReviewModel.updateOne(
                    { userID: req.user._id },
                    { $set: req.body },
                    { runValidators: true }
                );
                if (result.modifiedCount === 0) {
                    return res.status(400).json({
                        status: false,
                        message: "Update failed",
                        error: "Review not updated",
                    });
                } else {
                    res.status(201).json({
                        status: true,
                        message: "Successfully Updated",
                        result: "Your review updated successfully",
                    });
                }
            } else {
                const newReview = new ReviewModel(req.body);
                const result = await newReview.save();

                res.status(200).json({
                    status: true,
                    message: "Review Added",
                    result,
                });
            }
        } else {
            res.status(400).json({
                status: false,
                message: "Submission failed",
                result: "All fields are required",
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Submission failed",
            error: error.message,
        });
    }
};

exports.getAllReviewHandler = async (req, res) => {
    try {
        const result = await ReviewModel.find({})
            .populate("userID", "username")
            .populate("collegeID", "collegeName")
            .sort({ createdAt: -1 });
        res.status(200).json({
            status: true,
            message: "Review data fetch done",
            result,
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "data fetch failed",
            error: error.message,
        });
    }
};

exports.getSingleReviewHandler = async (req, res) => {
    const { userID, collegeID } = req.params;
    try {
        if (userID && collegeID) {
            const result = await ReviewModel.findOne({ userID, collegeID });
            res.status(200).json({
                status: true,
                message: "Review data fetch done",
                result,
            });
        } else {
            res.status(500).json({
                status: false,
                message: "data fetch failed",
                result: "provide userID and collegeID value",
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "data fetch failed",
            error: error.message,
        });
    }
};
