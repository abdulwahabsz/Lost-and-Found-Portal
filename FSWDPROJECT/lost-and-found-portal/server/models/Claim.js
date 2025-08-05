const mongoose = require('mongoose');

const foundItemSchema = new mongoose.Schema({
  item: String,
  location: String,
  date: Date,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Claim', foundItemSchema);
