// src/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// ... (initialize User model and sequelize)

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user.id }, '37de68e04081e9eff950e23c2af4cf340a70af31350dd0bca9a994a0fb7dd7df', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username is already taken
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already taken' });
        }

        if (username.length < 5) {
            return res.status(400).json({ error: 'Username should have at least 5 characters' });
        }

        // Validate password length
        if (password.length < 5) {
            return res.status(400).json({ error: 'Password should have at least 5 characters' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({ username, password: hashedPassword });

        // Generate a JWT for the newly registered user
        const token = jwt.sign({ userId: newUser.id }, '37de68e04081e9eff950e23c2af4cf340a70af31350dd0bca9a994a0fb7dd7df', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

