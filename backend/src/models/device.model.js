const Sequelize = require('sequelize')
const sequelize = require('../config/db')

const device = sequelize.define('Device', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  warning: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  isBeingEdited: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
})

module.exports = device
