// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/database'); // MongoDB connection
const offerRoutes = require('./routes/offer');   // Offer letter routes

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS if needed

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Routes
app.use('/offer', offerRoutes); // Set up the offer routes

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
