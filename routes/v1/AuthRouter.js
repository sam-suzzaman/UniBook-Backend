const express = require("express");
const AuthRouter = express.Router();

// Controllers
const AuthController = require("../../controllers/AuthControllers");

// Middlewares
const {
    isAuthenticatedUser,
} = require("../../middlewares/authenticationMiddleware");

// Routes(Private)
AuthRouter.route("/logout").post(
    isAuthenticatedUser,
    AuthController.logoutHandler
);

// Routes(Public)
AuthRouter.route("/register").post(AuthController.registrationHandler);
AuthRouter.route("/login/social").post(AuthController.socialLoginHandler);
AuthRouter.route("/login").post(AuthController.loginHandler);

module.exports = AuthRouter;
