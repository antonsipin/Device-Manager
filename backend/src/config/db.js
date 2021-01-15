const Sequilize = require('sequelize')

const sequelize = new Sequilize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.HOST,
  dialect: 'postgres'
})

module.exports = sequelize
