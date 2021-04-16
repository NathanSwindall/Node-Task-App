const User = require("../src/models/user")
const jwt = require("jsonwebtoken")
const mongoose = require('mongoose')

const userOne = {
    "name": "Nathan",
    "password": "BigBoi2014",
    "email": "Nathan.Swindall2010@example.com"
}


const setupDatabase = async () => {
    await User.deleteMany()
    await new User(userOne).save()
}

module.exports = {
    setupDatabase,
    userOne

}



