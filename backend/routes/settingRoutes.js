const express = require("express");
const router = express.Router();
const {
  getSettings,
  updateSettings
} = require("../controllers/settingController");

// Get current settings
router.get("/", getSettings);

// Update settings
router.put("/", updateSettings);

module.exports = router;
