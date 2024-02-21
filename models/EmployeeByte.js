const { DataTypes, Model } = require('sequelize')
const sequelize = require('../dbConnection')

class EmployeeByte extends Model {}

EmployeeByte.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    data: {
        type: DataTypes.BLOB,
        allowNull: false
    }
}, {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    tableName: 'employee_byte'
})

module.exports = EmployeeByte

