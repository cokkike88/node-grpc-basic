const _ = require('lodash');
const { convertEmployeeEntityFromBytes, convertEmployeeEntityFromBytesV2 } = require('./core/convertDataToBytes')

let employees = [
    {
      id: 1,
      email: 'abcd@abcd.com',
      firstName: 'First1',
      lastName: 'Last1',
    },
    {
      id: 2,
      email: 'xyz@xyz.com',
      firstName: 'First2',
      lastName: 'Last2',
    },
    {
      id: 3,
      email: 'temp@temp.com',
      firstName: 'First3',
      lastName: 'Last3',
    },
  ];
  
  
  
  function paySalary(call) {
    
      let employeeIdList = call.request.employeeIdList;     
    
      _.each(employeeIdList, function (employeeId) {
        console.log("Employeed Id", employeeId);
        let employee = _.find(employees, { id: employeeId });
        console.log(employee);
        if (employee != null) {
          let responseMessage = "Salary paid for ".concat(
            employee.firstName,
            ", ",
            employee.lastName);
          call.write({ message: responseMessage });
        }
        else{
          call.write({message: "Employee with Id " + employeeId + " not found in record"});
        }
    
      });
      call.end();
    
  }


  const getSalary = async (call) => {
    console.log('-------------- findByPk -----------------')
    const id = call.request.id    

    const employee = await convertEmployeeEntityFromBytesV2(id)
    call.write(employee);
    call.end()     
  }
  
  exports.paySalary = paySalary
  exports.getSalary = getSalary