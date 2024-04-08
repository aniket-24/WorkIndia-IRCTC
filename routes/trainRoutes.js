const express = require("express");
const router = express.Router();
const trainController = require("../controllers/trainController");

router.post("/create", trainController.createTrain);
router.get("/availability", trainController.getTrainAvailability);

module.exports = router;
