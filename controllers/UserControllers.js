// Importing
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

// Handlers
exports.resetPasswordHandler = async (req, res, next) => {
    const { email, oldPassword, newPassword } = req.body;

    try {
        if (email && oldPassword && newPassword) {
            const { user } = req;
            const isPasswordMatched = await bcrypt.compare(
                oldPassword,
                user.password
            );

            if (!isPasswordMatched) {
                res.status(400).json({
                    status: false,
                    message: "password reset failed",
                    result: "previous Password not matched",
                });
            } else {
                const salt = await bcrypt.genSalt(10);
                const newHashedPassword = await bcrypt.hash(newPassword, salt);
                const { _id, email } = user;
                const result = await UserModel.findOneAndUpdate(
                    { _id, email },
                    { password: newHashedPassword },
                    { new: true }
                );
                // to logout user after password reset
                res.cookie(process.env.COOKIE_NAME, "", {
                    sameSite: "none",
                    secure: false, //todo: must turn into true
                    httpOnly: true,
                    expires: new Date(0),
                    path: "/",
                });

                res.status(200).json({
                    status: true,
                    message: "Password reset Successfully",
                });
            }
        } else {
            res.status(400).json({
                status: false,
                message: "password reset failed",
                result: "all fields data required",
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "password reset failed",
            error: error.message,
        });
    }
};
