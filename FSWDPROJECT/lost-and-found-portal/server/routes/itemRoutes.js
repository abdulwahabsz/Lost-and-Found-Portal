const express = require('express');
const router = express.Router();
const LostItem = require('../models/Item');

router.post('/', async (req, res) => {
  try {
    const { itemName, lastSeenLocation, dateLost, description } = req.body;

    if (!itemName || !lastSeenLocation || !dateLost) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields: itemName, lastSeenLocation, dateLost'
      });
    }

    const newItem = new LostItem({
      itemName,
      lastSeenLocation,
      dateLost,
      description
    });

    await newItem.save();
    res.status(201).json({ success: true, message: 'Lost item reported successfully' });
  } catch (err) {
    console.error('❌ Failed to report item:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
