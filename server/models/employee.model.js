const { Schema, model } = require("mongoose");

const employeeSchema = new Schema({
    companyName: {
        type: String,
        required:true
    },
    employeeName: {
        type: String,
        required:true
    },
    cardNo: {
        type: Number,
        required:true
    },
    email: {
        type: String,
        required:true,
        unique:true
    },
    contactNo: {
        type: Number,
        required:true
    },
    department: {
        type: String,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    },

});

const EmployeeModel = model('employee', employeeSchema);

module.exports = { EmployeeModel }