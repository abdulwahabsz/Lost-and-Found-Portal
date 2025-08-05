const mongoose = require('mongoose');

const lostItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  lastSeenLocation: { type: String, required: true },
  dateLost: { type: Date, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LostItem', lostItemSchema);
