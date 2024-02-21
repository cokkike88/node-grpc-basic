const { DataTypes } = require('sequelize')
const sequelize = require('../dbConnection')

const Employee = sequelize.define('employee', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING
    },
    firstName: {
        type: DataTypes.STRING,
        field: 'first_name'
    },
    lastName: {
        type: DataTypes.STRING,
        field: 'last_name'
    }
}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = Employee
