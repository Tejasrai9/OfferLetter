const mongoose = require('mongoose');
const OfferLetter = require('./models/OfferLetter'); // Ensure the path is correct
const crypto = require('crypto');

async function insertOfferLetter() {
  await mongoose.connect('mongodb://localhost:27017/offerSystem'); // No extra options needed

  const token = crypto.randomBytes(16).toString('hex'); // Generate a new token

  const offerLetter = new OfferLetter({
    employeeId: '12345',
    offerContent: 'This is a confidential offer letter content.',
    token: token,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expire in 24 hours
  });

  await offerLetter.save();
  console.log('Offer letter inserted with token:', token);
  mongoose.connection.close();
}

insertOfferLetter().catch(console.error);
