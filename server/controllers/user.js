const { UserModel } = require("../models/user.model");
const bcrypt = require('bcrypt');
const { createError } = require("../utils/customError");
const  jwt  = require("jsonwebtoken");

const handleLogin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return next(createError(404, "User not found!"))
        }
        bcrypt.compare(password, user.password)
            .then((result) => {
                if (result) {
                    const token = jwt.sign({ id: user._id }, 'shhhhh');
                    const { password, ...otherDetails } = user._doc;
                    res
                        .cookie("access_token", token, {
                            httpOnly: true,
                        })
                        .status(200)
                        .send({ "user": { ...otherDetails }, message: "Login Successfully!" })
                }
                else {
                    next(createError(400, "Wrong password or username!"))
                }
            })
    }
    catch (err) {
        next(err)
    }
};

//register a user

const handleSignup = async (req, res, next) => {
    const { email, password } = req.body;
    //first check user in db
    const user = await UserModel.findOne({ email });

    if (user) {
        next(createError(201, 'User already created'));
    }
    try {
        //convert simple password into hash form
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                next(err)
            }
            else {
                const newUser = new UserModel({
                    email,
                    password: hash
                })
                await newUser.save();
                res.status(200).send({ success: true, message: "User created successfully" })
            }
        });
    }
    catch (error) {
        next(error)
    }
}

module.exports = { handleLogin, handleSignup }