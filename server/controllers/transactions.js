const { TransactionModel } = require("../models/transaction.model");
const { MachineModel } = require("../models/machine.model");
const { EmployeeModel } = require("../models/employee.model");
const { createError } = require("../utils/customError");

// http:// localhost/vendreq/SVZBLR0001?card=111029
// Params= machineid(SVZBLR0001)
// Query = card(111029)

const getAllTransaction = async (req, res, next) => {
    // machineid , employee's cardNo and Date or transaction.

    const { machineid, cardNo, startDate, ...others } = req.query

    // added conditions if it is available on queries

    const conditions = {};
    if (machineid) {
        const machine = await MachineModel.findOne({id:machineid});
        conditions.machineid = machine._id;
    }
    if (cardNo) {
        const employee = await EmployeeModel.findOne({ cardNo });
        conditions.employeeid = employee._id;
    }
    if (startDate) {
        conditions.date = {
            $gte: new Date(startDate),
            $lte: new Date(startDate),
        };
    }

    try {
        const Transactions = await TransactionModel.find(
            { ...others,...conditions }
        )
            .populate('machineid')
            .populate("employeeid");
        res.send(Transactions)
    } catch (error) {
        next(error)
    }
}

//create
const createTransaction = async (req, res, next) => {
    const machineid = req.params.id;
    const { card, slot } = req.query

    try {
        const machine = await MachineModel.findOne({ id: machineid });
        const employee = await EmployeeModel.findOne({ cardNo: card });

        let status = false;
        let message = "Your are not authorized"
        if (!machine || !employee) {
            message = "employee is not found"
            return next(createError(400, "Card is not valid"))
        }

        else if (machine.companyName === employee.companyName) {
            status = true;
            message = "Your are authorized"
        }
        const newTransaction = new TransactionModel({
            slotName: slot,
            machineid: machine._id,
            employeeid: employee._id,
            transactionStatus: status
        });
        await newTransaction.save();
        res.send({ newTransaction })
    } catch (error) {
        next(error)
    }
}



module.exports = { getAllTransaction, createTransaction }