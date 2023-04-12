const Sequelize = require('sequelize')
const connection = require("../database");

const User = connection.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING, // varchar(255)
        allowNull: false
    },
    email: {
        type: Sequelize.STRING // varchar(255)
    },
    username: {
        type: Sequelize.STRING, // varchar(255)
        allowNull: false,
        unique: true
    },
    senha: {
        type: Sequelize.STRING // varchar(255)
    }
})

module.exports = User