const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            // required: [true, "username is required"],
            // trim: true,
            // minLength: [5, "Too short username(min 3char)"],
            // maxLength: [30, "Too long username( max 30char)"],
        },
        email: {
            type: String,
            required: [true, "Valid email is required"],
        },
        password: {
            type: String,
            // required: [true, "Valid password is required"],
            // trim: true,
            // minLength: [6, "Too short(min 6char)"],
            // maxLength: [20, "Too long( max 20char)"],
        },
        isAdmitted: {
            type: Boolean,
            default: false,
        },
        department: {
            type: String,
            default: "",
        },
        address: {
            type: String,
            default: "",
        },
        contact: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

// Hashing Password
UserSchema.pre("save", async function (next) {
    if (this.password) {
        const password = this.password;
        const salt = await bcrypt.genSalt(16);
        const hashedPassword = bcrypt.hashSync(password, salt);
        this.password = hashedPassword;
        next();
    }
    next();
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
