const mongoose = require("mongoose");

const AdmissionSchema = new mongoose.Schema(
    {
        collegeID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "College",
            required: [true, "A selected college required"],
            trim: true,
        },
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: [true, "Authenticated user required"],
        },
        candidateName: {
            type: String,
            required: [true, "Candidate's name is required"],
            trim: true,
        },
        candidateEmail: {
            type: String,
            required: [true, "Candidate's email is required"],
            trim: true,
        },
        selectedSubject: {
            type: String,
            required: [true, "Admitted subject is required"],
            trim: true,
        },
        candidatePhoneNumber: {
            type: String,
            required: [true, "Candidate's phone number is required"],
            trim: true,
        },
        candidateDOB: {
            type: String,
            required: [true, "Candidate's DOB is required"],
            trim: true,
        },
        candidateAddress: {
            type: String,
            required: [true, "Candidate's address is required"],
            trim: true,
        },
        // candidateImage: {
        //     type: String,
        //     required: [true, "Candidate's photo is required"],
        //     trim: true,
        // },
    },
    { timestamps: true }
);

const AdmissionModel = mongoose.model("admission", AdmissionSchema);
module.exports = AdmissionModel;
