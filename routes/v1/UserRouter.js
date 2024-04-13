const express = require("express");

const UserRouter = express.Router();

// Controllers
const UserController = require("../../controllers/UserControllers");

// Middlewares
const {
    isAuthenticatedUser,
} = require("../../middlewares/authenticationMiddleware");

// Routes(Private)
UserRouter.route("/reset-password").put(
    isAuthenticatedUser,
    UserController.resetPasswordHandler
);

module.exports = UserRouter;
