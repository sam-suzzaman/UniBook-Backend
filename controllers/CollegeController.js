const CollegeModel = require("../models/CollegeModel");
const GraduatesModel = require("../models/GraduatesModel");

exports.getAllCollegeHandler = async (req, res, next) => {
    try {
        const filters = { ...req.query };
        // exclude
        const excludeFields = ["limit", "search"];
        excludeFields.forEach((field) => delete filters[field]);

        const queries = {};

        if (req.query.limit) {
            const limit = req.query.limit.split(",").join(" ");
            queries.limit = limit;
        }

        if (req.query.search) {
            const searchQuery = req.query.search;
            filters.$or = [
                {
                    collegeName: {
                        $regex: new RegExp(".*" + searchQuery + ".*", "i"),
                    },
                },
            ];
        }
        const result = await getCollegesData(filters, queries);

        res.status(200).json({
            status: true,
            message: "college data fetch done",
            result,
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "data fetch failed",
            error: error.message,
        });
    }
};

const getCollegesData = async (filters, queries) => {
    const result = await CollegeModel.find(filters).limit(queries.limit);

    return result;
};

exports.getSingleCollegeHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (id) {
            const result = await CollegeModel.findOne({ _id: id });

            res.status(200).json({
                status: true,
                message: "college data fetch done",
                result,
            });
        } else {
            res.status(500).json({
                status: false,
                message: "College not found",
                error: "invalid college id that you provide",
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

exports.getGraduatesGalllery = async (req, res) => {
    try {
        const result = await GraduatesModel.find({});
        res.status(200).json({
            status: true,
            message: "data fetching done",
            result,
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "data fetch failed",
            error: error.message,
        });
    }
};
