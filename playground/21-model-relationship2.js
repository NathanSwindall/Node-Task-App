const Task = require('../src/models/task')
const User = require('../src/models/user')

const print_tasks_from_user = async () => {
    const user = await User.findById('5fe0cedc8e397b1030a0af36')
    await user.populate('user_tasks').execPopulate()
    console.log(user.user_tasks) // This is the virtual field and now we have access to it
}

module.exports = print_tasks_from_user