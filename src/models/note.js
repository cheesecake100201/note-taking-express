// src/models/note.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Note = sequelize.define('note', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    currentVersion: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = Note;
