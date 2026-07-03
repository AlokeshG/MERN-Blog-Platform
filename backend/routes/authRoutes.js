const express = require("express");
const router = express.Router();

const {
  register,
  login,
  updatePassword,
  getUsers,
  deleteUser
} = require("../controllers/authController");

router.post("/register", register);

router.post("/login", login);

router.put("/update-password", updatePassword);

router.get("/users", getUsers);

router.delete("/:id", deleteUser);

module.exports = router;