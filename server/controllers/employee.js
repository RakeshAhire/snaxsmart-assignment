const { EmployeeModel } = require("../models/employee.model")

const getAllEmployee = async (req, res, next) => {
    try {
        const employees = await EmployeeModel.find();
        res.send(employees)
    } catch (error) {
        next(error)
    }
}

//create
const createEmployee = async (req, res, next) => {
    const payload = req.body;
    try {
        const newEmployee = new EmployeeModel(payload);
        await newEmployee.save();
        res.send(newEmployee)
    } catch (error) {
        next(error)
    }
}
//update
const updateEmployee = async (req, res, next) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        const newEmployee = await EmployeeModel.findByIdAndUpdate(id, { $set: payload }, { new: true });
        res.send(newEmployee)
    } catch (error) {
        next(error)
    }
}
//delete
const deleteEmployee = async (req, res, next) => {
    const { id } = req.params;
    try {
        const newEmployee = await EmployeeModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        res.send(newEmployee)
    } catch (error) {
        next(error)
    }
}


module.exports = { getAllEmployee, createEmployee, updateEmployee, deleteEmployee }