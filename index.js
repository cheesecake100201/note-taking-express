// src/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./src/utils/database');
const authRoutes = require('./src/routes/auth'); // Import auth routes
const noteRoutes = require('./src/routes/note');
const versionRoutes = require('./src/routes/version');
const { authenticateUser } = require('./src/utils/authMiddleware'); // Import auth middleware

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(__dirname)); //here is important thing - no static directory, because all static :)

app.get('/', (req, res) => {
  return res.status(200).json('Welcome to the Notes API');
});

app.use(cors());
app.use(bodyParser.json());

// Authentication routes
app.use('/auth', authRoutes);

// Middleware to authenticate users for note and version routes
app.use(authenticateUser);

// Note and version routes
app.use('/notes', noteRoutes);
app.use('/versions', versionRoutes);

sequelize.sync()
  .then(() => {
    console.log('Connected to the database.');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });




