const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
require('../src/db/mongoose') // get mongoose database running
const express = require('express')
const { findById } = require('../src/models/user')


/***************************************************
 * token model
 * 
 **********************************************  */
const tokenSchema = new mongoose.Schema({
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

tokenSchema.methods.generateAuthToken = async function(){
    const uniqueToken = this
    const token = jwt.sign({ _id: uniqueToken._id.toString()}, "Token")
    uniqueToken.tokens = uniqueToken.tokens.concat({token})
    await uniqueToken.save()

    return token
}
//make route to handle post (create user)
//make a route with authorization to get that user

const Token = mongoose.model('Tokens', tokenSchema)

/*********************************************************
 * verify token value with middle ware
 ********************************************************/
const auth = async (req, res, next) => {
    try {
        console.log("In auth statement")
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log(token)
        const decode = jwt.verify(token, "Token")
        console.log(decode)
        const tokenuser = await Token.findOne({_id: decode._id, 'token.token': decode.token})
        if(!tokenuser){
            throw new Error()
        }
        

        req.tokenuser = tokenuser
        next()
    } catch (error) {
        res.status(401).send("Unable to Authenticate")
    }
}

/*******************************************************
 * create express app
 ******************************************************/
const app = express()
const port = process.env.PORT || 3000


// use statements
app.use(express.json())



/*****************************************************
 * make token rotues
 *****************************************************/

app.post('/makeToken', async (req, res) => {
    const myToken = new Token(req.body)

    try {
        const token = await myToken.generateAuthToken()
        res.status(201).send({token})
    } catch (error) {
        res.status(500).send(error)
    }
})

// This will randomly log in as another person
app.post('/token/login', async (req,res) => {

    try {
        // get all users
        const tokenusers = await Token.find({})

        //get a random token user
        const num = Math.floor(Math.random()*(tokenusers.length))
        const tokenuser = tokenusers[num]
       
        //add a token to user
        const user = await Token.findById(tokenuser._id)
        if(!user){
            throw new Error()
        }

        console.log("hello")
        const token = await user.generateAuthToken()
        res.send({num, token})

    } catch (error) {
        res.status(401).send(error)
    }
})



app.get('/token',auth, async (req,res) => {
    
    try {
        res.send(req.tokenuser)
    } catch (error) {
        res.status(401).send("You were not able to log in")
    }
})

app.get('/makeToken/me', async (req,res) => {

    try {
        res.send("hello")
    } catch (error) {
        res.send(error)
    }
})

app.get('/', async (req, res) => {
    try {
        res.send("My token server is running")
    } catch (error) {
        res.status(404).send(error)
    }
})


/**********************************************************
 * start server
 **********************************************************/
app.listen(port, () => {
    console.log('The token server is up on port ' + port)
})

