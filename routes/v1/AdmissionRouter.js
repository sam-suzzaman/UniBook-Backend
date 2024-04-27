const express = require("express");
const AdmissionRouter = express.Router();

// Controllers
const AdmissionController = require("../../controllers/AdmissionController");

// Middlewares
const {
    isAuthenticatedUser,
} = require("../../middlewares/authenticationMiddleware");

// Routes(Private)
AdmissionRouter.route("/").get(
    isAuthenticatedUser,
    AdmissionController.getAdmittedCollegeHandler
);

// Routes(Public)
AdmissionRouter.route("/").post(AdmissionController.confirmAdmissionHandler);

module.exports = AdmissionRouter;
