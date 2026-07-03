const Contact = require("../models/Contact");

// Add Contact Message
exports.addContact = async (req, res) => {
  try {
    console.log("Received Body:", req.body);

    const contact = await Contact.create(req.body);

    console.log("Saved Contact:", contact);

    res.status(201).json(contact);

  } catch (error) {
    console.log("CONTACT ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
// Get All Messages
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({
      createdAt: -1,
    });

    res.json(contacts);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Message
exports.deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      message: "Message Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};