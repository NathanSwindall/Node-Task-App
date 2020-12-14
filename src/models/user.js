const validator = require("validator")
const mongoose = require("mongoose")


const User = mongoose.model('User', {
    password: {
        required: true,
        type: String,
        trim: true,
        minLength: 7,
        validate(value) {

            if(value.toLowerCase().includes("password"))
            {
                throw new Error("Password includes password")
            }
        }

    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invlaid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error("Age must be a positive number")
            }
        }
    }
})

module.exports = User;