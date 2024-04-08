const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const trainRoutes = require("./routes/trainRoutes");
const userRoutes = require("./routes/userRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");

dotenv.config();

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/bookings", bookingRoutes);
app.use("/trains", trainRoutes);
app.use("/users", userRoutes);

app.use(errorMiddleware.errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
