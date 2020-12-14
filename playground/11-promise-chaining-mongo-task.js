require('../src/db/mongoose')
const Task = require("../src/models/task")

const task1 = new Task({
    description: "Start watching the udemy videos",
    completed: false
})

const task2 = new Task({
    description: "Start learning how to sing",
    completed: false
})

const task3 = new Task({
    description: "Find your purpose in life"
})

task3.save().then((result) => {
    console.log("added task 3", result)
}).catch((e) => {
    console.log(e)
})


task1.save().then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})

task2.save().then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})


Task.findByIdAndRemove("5fd58b8a8fd99e0bb45162af").then((result) => {
    console.log(result)
    return Task.countDocuments({completed: false})
}).then((result2) => {
    console.log(result2)
}).catch((e) => {
    console.log(e)
})