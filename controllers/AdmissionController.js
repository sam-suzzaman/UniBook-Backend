const CollegeModel = require("../models/CollegeModel");
const GraduatesModel = require("../models/GraduatesModel");
const AdmissionModel = require("../models/AdmissionModel");
const UserModel = require("../models/UserModel");

exports.confirmAdmissionHandler = async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
        const isAlreadyAdmitted = await AdmissionModel.findOne({
            collegeID: data?.collegeID,
            userID: data?.userID,
        });

        if (isAlreadyAdmitted) {
            res.status(400).json({
                status: false,
                message: "Admission failed",
                result: "You have already admitted to a college",
            });
        } else {
            const applied = new AdmissionModel(data);
            const result = await applied.save();

            await UserModel.findByIdAndUpdate(data.userID, {
                isAdmitted: true,
            });

            res.status(200).json({
                status: true,
                message: "Admitted Successfully",
                result,
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Admission failed",
            error: error.message,
        });
    }
};
