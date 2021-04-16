const express = require('express')
require("./db/mongoose")
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const user_tasks = require('../playground/21-model-relationship2')


const app = express()




app.use(express.json()) // This is middleware so you know the incoming request is in JSON format
app.use(userRouter)
app.use(taskRouter)


module.exports = app

