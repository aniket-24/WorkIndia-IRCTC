const Train = require("../models/train");

exports.createTrain = async (req, res, next) => {
  try {
    const { name, source, destination, totalSeats } = req.body;
    const { adminKey } = req.headers;

    // Validate admin key
    if (adminKey !== process.env.ADMIN_KEY) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Check if train already exists
    const existingTrains = await Train.findBySourceAndDestination(
      source,
      destination
    );
    if (existingTrains.length > 0) {
      return res.status(400).json({ error: "Train already exists" });
    }

    // Create new train
    const newTrain = new Train({ name, source, destination, totalSeats });
    const trainId = await Train.create(newTrain);

    res.status(201).json({ trainId });
  } catch (err) {
    next(err);
  }
};

exports.getTrainAvailability = async (req, res, next) => {
  try {
    const { source, destination } = req.query;

    // Find trains between source and destination
    const trains = await Train.findBySourceAndDestination(source, destination);

    res.status(200).json(trains);
  } catch (err) {
    next(err);
  }
};
