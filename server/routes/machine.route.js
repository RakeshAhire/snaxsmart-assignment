const { Router } = require("express");
const { getAllMachine, createMachine, updateMachine, deleteMachine } = require("../controllers/machine");

const machineRouter=Router();

//get All machine
machineRouter.get('/',getAllMachine)
//create
machineRouter.post('/create',createMachine)
//update
machineRouter.put('/update/:id',updateMachine)
//delete
machineRouter.delete('/delete/:id',deleteMachine)


module.exports={machineRouter}