const { MachineModel } = require("../models/machine.model");

const getAllMachine = async (req, res, next) => {
    try {
        const machines = await MachineModel.find();
        res.send(machines)
    } catch (error) {
        next(error)
    }
}

//create
const createMachine = async (req, res, next) => {
    const payload = req.body;
    try {
        const newMachine = new MachineModel(payload);
        await newMachine.save();
        res.send(newMachine)
    } catch (error) {
        next(error)
    }
}
//update
const updateMachine = async (req, res, next) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        const newMachine = await MachineModel.findOne({ id });
        const result = await MachineModel.findByIdAndUpdate({_id:newMachine._id}, { $set: payload }, { new: true });
        res.send(result)
    } catch (error) {
        next(error)
    }
}
//delete
const deleteMachine = async (req, res, next) => {
    const { id } = req.params;
    try {
        const newMachine = await MachineModel.findOne({ id });
        const result = await MachineModel.findByIdAndUpdate({_id:newMachine._id}, { isDeleted: true }, { new: true });
        res.send(result)
    } catch (error) {
        next(error)
    }
}






module.exports = { getAllMachine, createMachine, updateMachine, deleteMachine }