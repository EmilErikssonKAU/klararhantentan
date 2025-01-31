const mongoose = require("mongoose");

const tentaSchema = new mongoose.Schema({
  coursename: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("Tenta", tentaSchema);
