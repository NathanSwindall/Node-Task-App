const validator = require("validator")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const Task = require("./task")


const userSchema = new mongoose.Schema({ // you can you use the 'new' keyword or you can not use it
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
        unique: true, // The email must be the only email in the database. Can't have multiples
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
    },
    tokens : [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer // multer takes care of validation
    }
}, {
    timestamps: true
})

// Not actual data stored in the database, but just a property stored there
userSchema.virtual('user_tasks', {
    ref: 'Task', // This is the model (collection you a referencing)
    localField: '_id', // This is the field in the User model, This will also be a user_id
    foreignField: 'owner' // This is the field that is the same in the Task model
})


// The methods call is for specific instance methods
// Remember that a function function has a this binding
userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, process.env.JWT_SECRET) // you need toString() because it can't be an object
    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}


// This toJson will affect the json string that we get back as a user
// We want to hide the tokens and password because we don't need that in 
// the response we get back
userSchema.methods.toJSON = function(){
    const user  = this
    const userObject = user.toObject()

    delete userObject.tokens
    delete userObject.password
    delete userObject.avatar

    return userObject

}


// The user statics are methods for all users to use
userSchema.statics.findByCredentials = async (email, password) => { // using statics keyword for making your own functions on the schema
    const user = await User.findOne({email})

    if(!user){
        throw new Error("Unable to login") // make sure message is the same
    }

    const isMatch = await bcrypt.compare(password,user.password) // the user.password is hashed, but the password is not hashed

    if(!isMatch){
        throw new Error("Unable to login")
    }

    return user
}


// middleware for the mongoose operations save and remove
userSchema.pre("save", async function(next){
    const user = this


    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    

    next() // must call this boilerplate code so that the function doesn't hang
})

userSchema.pre("remove", async function(next){
    const user = this
    await Task.deleteMany({owner: user._id})
    next()
})

const User = mongoose.model('User',userSchema )


module.exports = User;