const db = require("../config/database");

const Train = function (train) {
  this.name = train.name;
  this.source = train.source;
  this.destination = train.destination;
  this.totalSeats = train.totalSeats;
  this.availableSeats = train.totalSeats;
};

Train.create = async (newTrain) => {
  const query =
    "INSERT INTO trains (name, source, destination, total_seats, available_seats) VALUES (?, ?, ?, ?, ?)";
  const values = [
    newTrain.name,
    newTrain.source,
    newTrain.destination,
    newTrain.totalSeats,
    newTrain.totalSeats,
  ];

  try {
    const [result] = await db.query(query, values);
    return result.insertId;
  } catch (err) {
    throw err;
  }
};

Train.findBySourceAndDestination = async (source, destination) => {
  const query = "SELECT * FROM trains WHERE source = ? AND destination = ?";

  try {
    const [rows] = await db.query(query, [source, destination]);
    return rows;
  } catch (err) {
    throw err;
  }
};

Train.updateAvailableSeats = async (trainId, newAvailableSeats) => {
  const query = "UPDATE trains SET available_seats = ? WHERE id = ?";

  try {
    const [result] = await db.query(query, [newAvailableSeats, trainId]);
    return result.affectedRows > 0;
  } catch (err) {
    throw err;
  }
};

Train.findById = async (trainId) => {
  const query = "SELECT * FROM trains WHERE id = ?";

  try {
    const [rows] = await db.query(query, [trainId]);
    return rows[0];
  } catch (err) {
    throw err;
  }
};

module.exports = Train;
