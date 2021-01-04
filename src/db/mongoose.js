const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URL,{ // name of the database in mongoDB
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})







// const me = new User({
//     password: '1234567',
//     name: 'Nathan Swindall',
//     email: "Nathan.Swindall20103@gmail.com",
//     age: 29
// })



// trim the descritpion and make it required
// mak ecompleted optional and default it to false
//  test your work with and without erros


// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })










// const Task = mongoose.model('Task', {
//     description: {
//         type: String
//     },
//     completed: {
//         type: Boolean
//     }
// })

// const myTask = new Task({
//     description: "Work on React project",
//     completed: false
// })

// myTask.save().then((result) => {
//     console.log(result)
// }).catch( (error) => {
//     console.log(error)
// })

// const me = new User({
//     name: "Nathan",
//     age: "Johnson"
// })

// me.save().then((result)=>{
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

