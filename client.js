const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const PROTO_PATH = __dirname + '/employee.proto'

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})

let paymentProto = grpc.loadPackageDefinition(packageDefinition).employee


const client = new paymentProto.Employee('0.0.0.0:4500', grpc.credentials.createInsecure())
let employeeIdList = [1,2,3]
let r = client.paySalary({employeeIdList: employeeIdList})
r.on('data', function(data) {
    console.log(data)
})