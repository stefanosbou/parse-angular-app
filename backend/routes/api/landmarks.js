const express = require("express");
const router = express.Router();

const Landmark = require('../../controllers/Landmark');
const getUserFromToken = require('../../middleware/get-user-middleware');
const validateLandmarkInput = require('../../validations/update-landmark');

const upload = require('../../services/upload-sevice');

router.get("/", getUserFromToken(), async (req, res) => {
    try {
        const landmarksList = await Landmark.getLandmarks(req);
        return res.status(200).json(landmarksList);
    } catch (error) {
        res.status(500).json({ok: false, message: error.message});
    }
});

router.get("/:landmark_id", getUserFromToken(), async (req, res) => {
    try {
        const landmark = await Landmark.getLandmark(req);
        return res.status(200).json(landmark);
    } catch (error) {
        return res.status(500).json({ok: false, message: error.message});
    }
});

router.put("/:landmark_id",
    getUserFromToken(), upload, async (req, res) => {
        const {error, isValid} = validateLandmarkInput(req.body);
        // Check Validation
        if (!isValid) {
            return res.status(400).json({ok: false, message: error.message});
        }

        try {
            await Landmark.updateLandmark(req);
            const landmark = await Landmark.getLandmark(req);
            return res.status(200).json(landmark);
        } catch (error) {
            return res.status(500).json({ok: false, message: error.message});
        }
    });

module.exports = router;
