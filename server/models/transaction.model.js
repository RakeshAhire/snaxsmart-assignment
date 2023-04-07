const { Schema, model, default: mongoose } = require("mongoose");

const transactionSchema = new Schema({
    slotName: {
        type: String,
    },
    transactionStatus: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    machineid: {
        type: Schema.Types.ObjectId, ref: "machine"
    },
    employeeid: {
        type: Schema.Types.ObjectId, ref: "employee"
    }
});

const TransactionModel = model('transaction', transactionSchema);

module.exports = { TransactionModel }