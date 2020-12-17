const jwt = require('jsonwebtoken')

const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc123', email: "Nathan.Swindall20102@gmail.com"}, 'Hello', {expiresIn: '7 days'})  // unique identification, the secret, options
    console.log(token)

    const data = jwt.verify(token, 'Hello') // returns the payload if the signature is valid
    console.log(data)
}

myFunction()