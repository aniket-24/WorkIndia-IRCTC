const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/book", authMiddleware.verifyToken, bookingController.bookSeat);
router.get(
  "/details",
  authMiddleware.verifyToken,
  bookingController.getBookingDetails
);

module.exports = router;
