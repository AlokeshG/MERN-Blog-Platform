const Settings = require("../models/Settings");

// Get Settings
exports.getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({});
    }

    res.json(settings);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Settings
exports.updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      settings = await Settings.findByIdAndUpdate(
        settings._id,
        req.body,
        { new: true }
      );
    }

    res.json({
      message: "Settings Updated Successfully",
      settings,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};