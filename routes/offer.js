// routes/offer.js
const express = require('express');
const router = express.Router();
const OfferLetter = require('../models/OfferLetter');

// Route to view the offer letter
router.get('/:token', async (req, res) => {
  const { token } = req.params;

  try {
    const offerLetter = await OfferLetter.findOne({ token });

    // Check if the offer letter exists and is accessible
    if (!offerLetter || offerLetter.isAccessed || offerLetter.expiresAt < new Date()) {
      return res.json({ expired: true }); // Respond with expired status
    }

    // If the offer is still active, respond with expired: false
    res.json({ expired: false });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to respond to the offer letter (accept/reject)
router.post('/:token/respond', async (req, res) => {
  const { token } = req.params;
  const { response } = req.body; // Expected values: 'accepted' or 'rejected'

  try {
    const offerLetter = await OfferLetter.findOne({ token });

    // Check if the offer letter exists and hasn't already been accessed
    if (!offerLetter || offerLetter.isAccessed) {
      return res.status(403).json({ message: 'Offer has already been responded to or expired' });
    }

    // Update offer letter response and mark as accessed
    offerLetter.response = response;
    offerLetter.isAccessed = true;
    await offerLetter.save();

    res.json({ message: 'Your response has been recorded.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
