const express = require('express');
const router = express.Router();
const Claim = require('../models/Claim'); // Import your Claim model

// GET all claims/found items
router.get('/', async (req, res) => {
  try {
    const claims = await Claim.find().sort({ createdAt: -1 }); // Get latest first
    res.json({ 
      success: true,
      message: 'Claims fetched successfully',
      data: claims
    });
  } catch (error) {
    console.error('Error fetching claims:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch claims',
      error: error.message 
    });
  }
});

// POST new claim (This is what your frontend calls)
router.post('/', async (req, res) => {
  try {
    const { item, location, date, description } = req.body;
    
    // Validate required fields
    if (!item || !location || !date) {
      return res.status(400).json({
        success: false,
        message: 'Item name, location, and date are required'
      });
    }

    // Create new claim
    const newClaim = new Claim({
      item,
      location,
      date,
      description,
      status: 'pending', // Default status
      reportedAt: new Date()
    });

    const savedClaim = await newClaim.save();
    
    res.status(201).json({ 
      success: true,
      message: 'Found item reported successfully!',
      data: savedClaim
    });
  } catch (error) {
    console.error('Error creating claim:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to report found item',
      error: error.message 
    });
  }
});

// GET claim by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const claim = await Claim.findById(id);
    
    if (!claim) {
      return res.status(404).json({
        success: false,
        message: 'Claim not found'
      });
    }
    
    res.json({ 
      success: true,
      message: 'Claim fetched successfully',
      data: claim
    });
  } catch (error) {
    console.error('Error fetching claim:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch claim',
      error: error.message 
    });
  }
});

// PUT update claim
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedClaim = await Claim.findByIdAndUpdate(
      id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!updatedClaim) {
      return res.status(404).json({
        success: false,
        message: 'Claim not found'
      });
    }
    
    res.json({ 
      success: true,
      message: 'Claim updated successfully',
      data: updatedClaim
    });
  } catch (error) {
    console.error('Error updating claim:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to update claim',
      error: error.message 
    });
  }
});

// DELETE claim
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedClaim = await Claim.findByIdAndDelete(id);
    
    if (!deletedClaim) {
      return res.status(404).json({
        success: false,
        message: 'Claim not found'
      });
    }
    
    res.json({ 
      success: true,
      message: 'Claim deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting claim:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to delete claim',
      error: error.message 
    });
  }
});

module.exports = router;