const { Router } = require("express");
const { getAllTransaction, createTransaction } = require("../controllers/transactions");
const { verifyToken } = require("../middlewares/verifyToken");

const transactionRouter=Router();

//get All Transaction
transactionRouter.get('/',verifyToken, getAllTransaction)
//create
transactionRouter.post('/:id',createTransaction)


module.exports={transactionRouter}