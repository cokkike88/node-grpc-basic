const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

let { paySalary, getSalary, employees } = require('./pay_salary')
const PROTO_PATH = __dirname + '/proto/employee.proto'


const { convertEmployees } = require('./core/convertDataToBytes')

console.log(process.argv)

if (process.argv[2] === '-s'){
    convertEmployees(employees).then().catch(error => console.error(error))
}

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})

let employee_proto = grpc.loadPackageDefinition(packageDefinition).employee

let server = new grpc.Server();
server.addService(employee_proto.Employee.service, { 
    paySalary: paySalary,
    paySalaryById: getSalary
})
server.bindAsync('0.0.0.0:4500', grpc.ServerCredentials.createInsecure(), () => {
    console.log('server running on port 4500')
})