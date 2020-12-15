const validator = require("validator")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({ // you can you use the 'new' keyword or you can not use it
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

userSchema.pre("save", async function(next){
    const user = this


    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    

    next() // must call this boilerplate code so that the function doesn't hang
})

const User = mongoose.model('User',userSchema )


module.exports = User;