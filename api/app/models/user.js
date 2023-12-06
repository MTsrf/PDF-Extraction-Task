const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "email is required"],
        trim: true
    },
    phone_number: {
        type: String,
        required: [true, "Phone Number is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    isActive: Boolean,
}, { timestamps: true })

module.exports = mongoose.model("user", userSchema)