const db = require("../config/database");

const User = function (user) {
  this.name = user.name;
  this.email = user.email;
  this.password = user.password;
  this.role = user.role || "user";
};

User.create = async (newUser) => {
  const query =
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
  const values = [newUser.name, newUser.email, newUser.password, newUser.role];

  try {
    const [result] = await db.query(query, values);
    return result.insertId;
  } catch (err) {
    throw err;
  }
};

User.findByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = ?";

  try {
    const [rows] = await db.query(query, [email]);
    return rows[0];
  } catch (err) {
    throw err;
  }
};

module.exports = User;
