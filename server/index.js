const express = require('express');
const cors=require('cors');
const cookieParser = require('cookie-parser')
const { connection } = require('./config/db');
const { userRouter } = require('./routes/user.route');
const { employeeRouter } = require('./routes/employee.route');
const { machineRouter } = require('./routes/machine.route');
const { transactionRouter } = require('./routes/transactions.route');

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.get("/", async (req, res) => {
    try {
        res.send("Ok")
    } catch (error) {
        console.log('error: ', error);
    }
})

app.use('/user',userRouter);
app.use('/employee',employeeRouter);
app.use('/machine',machineRouter); 
app.use('/vendreq',transactionRouter); 

//error hadnling middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
}) 

app.listen(8080, async () => {
    try {
        await connection;
        console.log("Server running on 8080 port")
    } catch (error) {
        console.log("Server is not running")
    }
})