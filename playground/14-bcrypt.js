// messing around with bcrypt
const bcrypt = require('bcryptjs')

const myFunction = async () => {
    const password = "BigBoi123@"
    const hashedPassword = await bcrypt.hash(password, 8) // 8 is number of rounds for the hashed password

    console.log(password)
    console.log(hashedPassword)

    const isMatch = await bcrypt.compare("BigBoi123@", hashedPassword)
    console.log(isMatch)
}

myFunction()

/*
encrypt: andrew -> defjdlj3lkrjelfjd -> andrew you can get it back
Hashingalgo: andrew -> dfjkdlfjdlfkjlf    you can't get i back

*/

