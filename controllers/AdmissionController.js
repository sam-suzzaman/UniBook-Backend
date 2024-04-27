const AdmissionModel = require("../models/AdmissionModel");
const UserModel = require("../models/UserModel");

exports.confirmAdmissionHandler = async (req, res) => {
    const data = req.body;
    try {
        const isAlreadyAdmitted = await AdmissionModel.findOne({
            collegeID: data?.collegeID,
            userID: data?.userID,
        });
        const isAlreadyAdmitted2 = await UserModel.findOne({
            _id: data?.userID,
            isAdmitted: true,
        });

        if (isAlreadyAdmitted || isAlreadyAdmitted2) {
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
                department: req.body.selectedSubject,
            });

            // Fetch the updated user information
            const updatedUser = await UserModel.findOne({
                _id: data.userID,
            }).select("-password");

            res.status(200).json({
                status: true,
                message: "Admitted Successfully",
                result,
                updatedUser,
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

exports.getAdmittedCollegeHandler = async (req, res) => {
    try {
        // const { id } = req.params;
        const { _id: id } = req.user;
        if (id) {
            const result = await AdmissionModel.findOne({
                userID: id,
            }).populate("collegeID");
            if (result) {
                res.status(200).json({
                    status: true,
                    message: "college data fetch done",
                    result,
                });
            } else {
                res.status(500).json({
                    status: false,
                    message: "college not found",
                    result: "your are not admitted to a college",
                });
            }
        } else {
            res.status(500).json({
                status: false,
                message: "College not found",
                error: "you are not admitted to a college",
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "data fetch failed",
            error: error.message,
        });
    }
};
