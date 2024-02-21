const protobufjs = require('protobufjs')
const path = require('path')
const fs = require('fs')
const fsExtra = require('fs-extra')

const protoPath = path.join(__dirname, '../') + 'proto/employee.proto'
const storageFilePath = path.join(__dirname, '../data/')


/**
 * Convert each employee from Employee table to byte using Protocol buffer
 */
let convertEmployees = async employees => {
    const root = await protobufjs.load(protoPath)
    const response = root.lookupType('employee.EmployeeEntity')
    let employeeBytes = []
    let protobufPromises = []
    fsExtra.emptyDirSync(storageFilePath)
    employees.forEach(async employee => {              
        const message = response.create(employee)
        const buffer = response.encode(message).finish()
        console.log(buffer)
        employeeBytes.push({id: employee.id, data: buffer})
    });    
    fs.writeFile(storageFilePath + 'data.json', JSON.stringify(employeeBytes), 'utf-8', err => {
        if(err){
            console.error(err)
            return
        }
        console.log('Data file created')
    })

}

/**
 * Find an employee by id from serializable data table (EmployeeByte)
 * @param {id} id 
 * @returns 
 */
let convertEmployeeEntityFromBytes = (id) => {
    return new Promise(async (resolve, reject) => {
        let employees = fs.readFileSync(storageFilePath + 'data.json', {encoding: 'utf-8'})
        employees = JSON.parse(employees)
        let employee = employees.filter(x => x.id === id)
        if (employee.length === 0)
            return resolve(null)
        console.log(employee)
        console.log(employee[0].data)
        protobufjs.load(protoPath)
        .then(async (root) => {
            const response = root.lookupType('employee.EmployeeEntity')
                const buffer = employee[0].data.data
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
    convertEmployeeEntityFromBytes
}