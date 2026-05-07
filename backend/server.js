const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const authMiddleware = require('./middleware/authMiddleware');
const complaintRoutes = require('./routes/complaint');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
app.use('/api/complaint', complaintRoutes);

// Test route
app.get('/test', (req, res) => {
  res.json({ message: "Backend working" });
});

app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({
    message: "You are authorized",
    user: req.user
  });
});

// 🔥 Connect to MongoDB FIRST
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');

    // Start server AFTER DB connects
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  })
  .catch(err => console.log(err));