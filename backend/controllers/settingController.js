const Setting = require("../models/Setting");
// Get current settings
exports.getSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();

    // If no settings exist, return default values
    if (!settings) {
      settings = new Setting();
      await settings.save();
    }

    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update settings
exports.updateSettings = async (req, res) => {
  try {
    const { loanPeriodDays, finePerDay, maxBorrowLimit } = req.body;

    let settings = await Setting.findOne();

    if (!settings) {
      settings = new Setting({ loanPeriodDays, finePerDay, maxBorrowLimit });
    } else {
      settings.loanPeriodDays = loanPeriodDays;
      settings.finePerDay = finePerDay;
      settings.maxBorrowLimit = maxBorrowLimit;
    }

    await settings.save();
    res.status(200).json({ message: "Settings updated successfully", settings });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
