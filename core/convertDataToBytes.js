const protobufjs = require('protobufjs')
const path = require('path')
const Employee = require('../models/Employee')
const EmployeeByte = require('../models/EmployeeByte')


const protoPath = path.join(__dirname, '../') + '/employee.proto'


/**
 * Convert each employee from Employee table to byte using Protocol buffer
 */
let convertEmployees = async () => {
    let employees = await Employee.findAll();
    employees.forEach(employeeEntity => {
        const employee = employeeEntity.dataValues
        console.log(employee)        
        protobufjs.load(protoPath)
        .then(async (root) => {
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

        }).catch((error) => {
            console.log(error)
        })
    });
}

/**
 * Find an employee by id
 * @param {int} id 
 * @returns 
 */
let convertEmployee = (id) => {
    return new Promise(async (resolve, reject) => {
        let employeeEntity = await Employee.findByPk(id)
        let employee = employeeEntity.dataValues
        protobufjs.load(protoPath)
        .then(async (root) => {
            const response = root.lookupType('employee.EmployeeEntity')
                const message = response.create(employee)
                const buffer = response.encode(message).finish()
                console.log(buffer)
                return resolve(buffer)

        })
        .catch(error => {
            return reject(error)
        })
    })    
}

/**
 * Find an employee by id from serializable data table (EmployeeByte)
 * @param {id} id 
 * @returns 
 */
let convertEmployeeEntityFromBytes = (id) => {
    return new Promise(async (resolve, reject) => {
        const employeeByte = await EmployeeByte.findByPk(id)
        protobufjs.load(protoPath)
        .then(async (root) => {
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
        .catch(error => {
            return reject(error)
        })
    })     

}

module.exports = {
    convertEmployees,
    convertEmployee,
    convertEmployeeEntityFromBytes
}