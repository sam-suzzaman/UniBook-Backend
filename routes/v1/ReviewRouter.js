const express = require("express");
const ReviewRouter = express.Router();

// Controllers
const ReviewController = require("../../controllers/ReviewController");

// Middlewares
const {
    isAuthenticatedUser,
} = require("../../middlewares/authenticationMiddleware");

// Routes(Private)
ReviewRouter.route("/").post(
    isAuthenticatedUser,
    ReviewController.addReviewHandler
);
ReviewRouter.route("/:userID/:collegeID").get(
    isAuthenticatedUser,
    ReviewController.getSingleReviewHandler
);
ReviewRouter.route("/").get(
    isAuthenticatedUser,
    ReviewController.getAllReviewHandler
);

module.exports = ReviewRouter;
