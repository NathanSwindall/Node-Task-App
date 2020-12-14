require("../src/db/mongoose")
const User = require("../src/models/user")


// User.findByIdAndUpdate("5fd25baa94fb233f08169696",{age: 29}).then((result) => {
//     console.log("Updated")

//     return User.find({})
// }).then((result2) => {
//     console.log(result2)
//     return User.countDocuments({age: 29})
// }).then((result3) => {
//     console.log(result3)
// }).catch((e) => {
//     console.log(e)
// })



const findUpdateAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count
}

findUpdateAndCount("5fd39a56f0e3733c905da658", 29).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})

