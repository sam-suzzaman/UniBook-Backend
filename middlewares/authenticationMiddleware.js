const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

exports.isAuthenticatedUser = async (req, res, next) => {
    const token = req.signedCookies[process.env.COOKIE_NAME];

    if (!token) {
        const error = new Error("Authentication failed");
        error.status = 401;
        error.message = "Unauthenticated user";
        next(error);
    }
    try {
        const { ID, username } = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await UserModel.findOne({ _id: ID, username });
        // req.user = await UserModel.findOne({ _id: ID, username }).select(
        //     "-password"
        // );
        next();
    } catch (err) {
        const error = new Error("Authentication failed");
        error.status = 401;
        error.message = "Unauthenticated user";
        next(error);
    }
};
