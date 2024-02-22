const protobufjs = require('protobufjs')
const path = require('path')
const sequelize = require('../dbConnection')
const { QueryTypes } = require('sequelize')
const Employee = require('../models/Employee')
const EmployeeByte = require('../models/EmployeeByte')


const protoPath = path.join(__dirname, '../proto/employee.proto')


/**
 * Convert each employee from Employee table to byte using Protocol buffer
 */
let convertEmployees = async () => {
    const root = await protobufjs.load(protoPath)
    let employees = await Employee.findAll();
    employees.forEach(async employeeEntity => {
        const employee = employeeEntity.dataValues
        console.log(employee)        
        const response = root.lookupType('employee.EmployeeEntity')
        const message = response.create(employee)
        const buffer = response.encode(message).finish()
        console.log(buffer)

        const newMessage = response.decode(buffer)
        const obj = response.toObject(newMessage, {
            longs: String,
            enums: String,
            bytes: String
        })
        console.log(obj)

        const savedData = await EmployeeByte.create({id: employee.id, data: buffer})
        console.log(`data saved: ${savedData.id}`)

    });
}

/**
 * Find an employee by id
 * @param {int} id 
 * @returns 
 */
let convertEmployee = (id) => {
    return new Promise(async (resolve, reject) => {
        const root = await protobufjs.load(protoPath)
        let employeeEntity = await mployee.findByPk(id)
        let employee = employeeEntity.dataValues
        const response = root.lookupType('employee.EmployeeEntity')
        const message = response.create(employee)
        const buffer = response.encode(message).finish()
        console.log(buffer)
        return resolve(buffer)

    })    
}

/**
 * Find an employee by id from serializable data table (EmployeeByte)
 * @param {id} id 
 * @returns 
 */
let convertEmployeeEntityFromBytes = (id) => {
    return new Promise(async (resolve, reject) => {
        const root = await protobufjs.load(protoPath)
        const employeeByte = await EmployeeByte.findByPk(id)
        const response = root.lookupType('employee.EmployeeEntity')
        const buffer = employeeByte.data
        const message = response.decode(buffer)
        const obj = response.toObject(message, {
            longs: String,
            enums: String,
            bytes: String
        })
        return resolve(obj)

    })     

}

let convertEmployeeEntityFromBytesV2 = (id) => {
    return new Promise(async (resolve, reject) => {
        const root = await protobufjs.load(protoPath)
        const employeeByte = await sequelize.query(`SELECT * FROM employee_byte WHERE id = ${id} `, {type: QueryTypes})
        console.log(employeeByte)
        const response = root.lookupType('employee.EmployeeEntity')
        const buffer = employeeByte[0].data
        const message = response.decode(buffer)
        const obj = response.toObject(message, {
            longs: String,
            enums: String,
            bytes: String
        })
        return resolve(obj)

    })     

}


module.exports = {
    convertEmployees,
    convertEmployee,
    convertEmployeeEntityFromBytes,
    convertEmployeeEntityFromBytesV2
}