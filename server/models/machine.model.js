const { Schema, model } = require("mongoose")

const machineSchema = new Schema({
    id:{
        type: String,
        required: true
    },
    companyName:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    installLocation:{
        type: String,
    },
    isDeleted:{
        type: Boolean,
        default: false,
    },
}, { timestamps: true })

const MachineModel = model('machine', machineSchema);

module.exports = { MachineModel }