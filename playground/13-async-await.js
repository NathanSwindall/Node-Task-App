require("../src/db/mongoose")
const Task = require("../src/models/task")

const updateAndRemoveCount = async (id) => {
    console.log(id)
    const user = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed: false})
    return count
} 


updateAndRemoveCount("5fd6b11dd5bf384e4027f471").then((result) =>{
    console.log(result)
}).catch((e) => {
    console.log(e)
})