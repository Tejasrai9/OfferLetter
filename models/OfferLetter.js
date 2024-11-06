// models/OfferLetter.js
const mongoose = require('mongoose');

const offerLetterSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  offerContent: { type: String, required: true },
  token: { type: String, required: true, unique: true }, // Unique access token
  isAccessed: { type: Boolean, default: false },         // Tracks if offer has been accessed
  response: { type: String, enum: ['accepted', 'rejected', ''], default: '' },
  expiresAt: { type: Date, required: true },             // Expiration date of the token
});

module.exports = mongoose.model('OfferLetter', offerLetterSchema);
