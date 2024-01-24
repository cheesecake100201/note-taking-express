// src/utils/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authenticateUser = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, '37de68e04081e9eff950e23c2af4cf340a70af31350dd0bca9a994a0fb7dd7df');
        const user = await User.findByPk(decoded.userId);

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }

        req.user = user; // Attach the user to the request for further use
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};
