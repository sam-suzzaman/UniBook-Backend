const express = require("express");
const CollegeRouter = express.Router();

// Controllers
const CollegeController = require("../../controllers/CollegeController");

// Middlewares
const {
    isAuthenticatedUser,
} = require("../../middlewares/authenticationMiddleware");

// Routes(Private)
// CollegeRouter.route("/logout").post(
//     isAuthenticatedUser,
//     AuthController.logoutHandler
// );

// Routes(Public)
CollegeRouter.route("/graduates").get(CollegeController.getGraduatesGalllery);
CollegeRouter.route("/:id").get(CollegeController.getSingleCollegeHandler);
CollegeRouter.route("/").get(CollegeController.getAllCollegeHandler);

module.exports = CollegeRouter;
