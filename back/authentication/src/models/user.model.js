const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'client',
  },
  referralCode: {                    // <-- Ajout ici
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
})

module.exports = User
