const express = require('express')
require("./db/mongoose")
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const user_tasks = require('../playground/21-model-relationship2')





const app = express()
const port = process.env.PORT || 3000



app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})




