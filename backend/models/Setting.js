const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  loanPeriodDays: {
    type: Number,
    default: 14
  },
  finePerDay: {
    type: Number,
    default: 5
  },
  maxBorrowLimit: {
    type: Number,
    default: 3
  }
});

module.exports = mongoose.model("Setting", settingSchema);
