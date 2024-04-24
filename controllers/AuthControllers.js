// Importing
const UserModel = require("../models/UserModel");
const JWTgenerator = require("../utils/JWTgenerator");
const bcrypt = require("bcrypt");

// Handlers
exports.registrationHandler = async (req, res, next) => {
    const data = req.body;

    try {
        const isUserExists = await UserModel.findOne({ email: data.email });

        if (isUserExists) {
            res.status(400).json({
                status: false,
                message: "Registration failed",
                result: "User already exists",
            });
        } else {
            const newUser = new UserModel(data);
            const result = await newUser.save();

            // JWT Token
            const tokenObj = {
                ID: result._id,
                username: result.username,
            };
            const TOKEN = JWTgenerator(tokenObj);

            const one_day = 1000 * 60 * 60 * 24; //since token expire in 1day
            res.cookie(process.env.COOKIE_NAME, TOKEN, {
                expires: new Date(Date.now() + one_day),
                secure: false, //todo: must turn into true
                httpOnly: true,
                signed: true,
                sameSite: "None",
            });

            // Exclude(remove) password field from the result
            const { password, ...resultWithoutPassword } = result.toObject();

            res.status(200).json({
                status: true,
                message: "Registration Successfull",
                result: resultWithoutPassword,
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Registration failed",
            error: error.message,
        });
    }
};

exports.loginHandler = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (email && password) {
            const isUserExists = await UserModel.findOne({ email: email });

            if (!isUserExists) {
                res.status(400).json({
                    status: false,
                    message: "login failed",
                    result: "User not found",
                });
            } else {
                const isPasswordMatched = await bcrypt.compare(
                    password,
                    isUserExists.password
                );

                if (!isPasswordMatched) {
                    res.status(400).json({
                        status: false,
                        message: "login failed",
                        result: "Email or Password not matched",
                    });
                } else {
                    // JWT Token
                    const tokenObj = {
                        ID: isUserExists._id,
                        username: isUserExists.username,
                    };
                    const TOKEN = JWTgenerator(tokenObj);

                    const one_day = 1000 * 60 * 60 * 24; //since token expire in 1day
                    res.cookie(process.env.COOKIE_NAME, TOKEN, {
                        expires: new Date(Date.now() + one_day),
                        secure: true, //todo: must turn into true
                        httpOnly: true,
                        signed: true,
                        sameSite: "None",
                    });

                    // Exclude(remove) password field from the result
                    const { password, ...resultWithoutPassword } =
                        isUserExists.toObject();

                    res.status(200).json({
                        status: true,
                        message: "Login Successfull",
                        result: resultWithoutPassword,
                    });
                }
            }
        } else {
            res.status(400).json({
                status: false,
                message: "login failed",
                result: "Email and Password required to login",
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Login failed",
            error: error.message,
        });
    }
};

exports.socialLoginHandler = async (req, res, next) => {
    console.log("pass", req.body);
    try {
        if (req.body.email) {
            const isUserExists = await UserModel.findOne({
                email: req.body.email,
            });

            if (!isUserExists) {
                const newUser = new UserModel(req.body);
                const result = await newUser.save();

                // JWT Token
                const tokenObj = {
                    ID: result._id,
                    username: result.username,
                };
                const TOKEN = JWTgenerator(tokenObj);

                const one_day = 1000 * 60 * 60 * 24; //since token expire in 1day
                const twoMinutes = 2 * 60 * 1000;
                // const expireTime = new Date(Date.now() + one_day);
                res.cookie(process.env.COOKIE_NAME, TOKEN, {
                    expires: new Date(Date.now() + twoMinutes),
                    secure: true, //todo: must turn into true
                    httpOnly: true,
                    signed: true,
                    sameSite: "None",
                });

                res.status(200).json({
                    status: true,
                    message: "Login Successfull",
                    result,
                });
            } else {
                // JWT Token
                const tokenObj = {
                    ID: isUserExists._id,
                    username: isUserExists.username,
                };
                const TOKEN = JWTgenerator(tokenObj);

                const one_day = 1000 * 60 * 60 * 24; //since token expire in 1day
                res.cookie(process.env.COOKIE_NAME, TOKEN, {
                    expires: new Date(Date.now() + one_day),
                    secure: false, //todo: must turn into true
                    httpOnly: true,
                    signed: true,
                    sameSite: "None",
                });
                // Exclude(remove) password field from the result
                const { password, ...resultWithoutPassword } =
                    isUserExists.toObject();

                res.status(200).json({
                    status: true,
                    message: "Login Successfull",
                    result: resultWithoutPassword,
                });
            }
        } else {
            res.status(400).json({
                status: false,
                message: "login failed",
                result: "Email and Password required to login",
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Login failed",
            error: error.message,
        });
    }
};

exports.logoutHandler = async (req, res, next) => {
    try {
        res.cookie(process.env.COOKIE_NAME, "", {
            sameSite: "none",
            secure: false, //todo: must turn into true
            httpOnly: true,
            expires: new Date(0),
            path: "/",
        })
            .status(200)
            .json({
                status: true,
                message: "Successfully logout",
            });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "logout failed",
            error: error.message,
        });
    }
};
