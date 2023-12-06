const user = require("../models/user")
const { generateToken } = require("../util/utils")
const bcrypt = require('bcrypt')
const { loginSchema, signupSchema } = require("../validator/userValidation")

exports.userRegister = async (req, res, next) => {
    const { error, value } = signupSchema.validate(req.body)
    const { name, email, password, phone_number } = value

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        // const check = await user.findOne({ $or: [{ "email": email }, { "phone_number": phone_number }] })
        const userEmail = await user.findOne({ email: email });
        if (userEmail) {
            const emailError = new Error("Email already exists.");
            emailError.status = 400;
            throw emailError;
        }
        const userPhone = await user.findOne({ phone_number: phone_number });
        if (userPhone) {
            const phoneError = new Error("Phonenumber already exists.");
            phoneError.status = 400;
            throw phoneError;
        }
        const pswd = await bcrypt.hash(password, 10)
        const newUser = new user({
            email: email,
            name: name,
            password: pswd,
            phone_number: phone_number,
            isActive: true
        })
        await newUser.save()
        const token = generateToken(newUser)
        return res.status(200).json({
            statusCode: 200,
            accessToken: token,
            message: "Successfully Registered"
        })
    } catch (error) {
        next(error)
    }
}

exports.userDetails = async (req, res, next) => {
    try {
        const resp = await user.findById(req.user)
        const data = {
            user: {
                name: resp.name,
                email: resp.email,
                phone_number: resp.phone_number,
            },
            isAuthenticated: true
        }
        return res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: data
        })
    } catch (error) {
        next(error)
    }
}

exports.userLogin = async (req, res, next) => {
    const { error, value } = loginSchema.validate(req.body)
    const { email, password } = value
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const resp = await user.findOne({ email: email })
        if (!resp) {
            const Errors = new Error("Invalid Email Address.Please Register Now");
            Errors.status = 404;
            throw Errors;
        }
        const pswd = await bcrypt.compare(password, resp.password)
        if (!pswd) {
            const Errors = new Error("Invalid Password");
            Errors.status = 404;
            throw Errors;
        }
        const token = generateToken(resp)
        return res.status(200).json({
            statusCode: 200,
            accessToken: token,
            message: "Successfully Login"
        })
    } catch (error) {
        next(error)
    }
}