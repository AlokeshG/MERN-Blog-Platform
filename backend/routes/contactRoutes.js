const express = require("express");
const router = express.Router();

const {
  addContact,
  getContacts,
  deleteContact,
} = require("../controllers/contactController");

// Add Message
router.post("/", addContact);

// Get All Messages
router.get("/", getContacts);

// Delete Message
router.delete("/:id", deleteContact);

module.exports = router;