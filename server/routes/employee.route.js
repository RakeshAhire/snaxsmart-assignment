const { Router } = require("express");
const { getAllEmployee, createEmployee, updateEmployee, deleteEmployee } = require("../controllers/employee");

const employeeRouter=Router();

//get All employee
employeeRouter.get('/',getAllEmployee)
//create
employeeRouter.post('/create',createEmployee)
//update
employeeRouter.put('/update/:id',updateEmployee)
//delete
employeeRouter.delete('/delete/:id',deleteEmployee)


module.exports={employeeRouter}