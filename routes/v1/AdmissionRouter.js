const express = require("express");
const AdmissionRouter = express.Router();

// Controllers
const AdmissionController = require("../../controllers/AdmissionController");

// Middlewares
const {
    isAuthenticatedUser,
} = require("../../middlewares/authenticationMiddleware");

// Routes(Private)
// AdmissionRoute.route("/").post(isAuthenticatedUser);

// Routes(Public)
AdmissionRouter.route("/").post(AdmissionController.confirmAdmissionHandler);

module.exports = AdmissionRouter;
