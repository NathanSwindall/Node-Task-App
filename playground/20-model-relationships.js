const mongoose = require('mongoose')
require('../src/db/mongoose')
const express = require('express')
const jwt = require("jsonwebtoken")
const Task = require('../src/models/task')
const User = require('../src/models/user')


/*****************************************************
* Models
 ****************************************************/
const dogSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,

    },
    age: {
        type: Number,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Owner'
    }
})




const ownerSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true
    },
    token: {
        required: true,
        type: String
    }

})

// because this is in another collection we are not trying to store it. 
// We are just trying to setup a relationship between the two different collections
ownerSchema.virtual('dogs', {
    ref: 'Dog',
    localField: '_id',  // what is the owner thing related to on the ownerSchema
    foreignField: 'owner', // What is the owner related to on Dog
})

ownerSchema.methods.generateAuthToken = async function(){
    const owner = this
    const token = jwt.sign({_id: owner._id}, "Dog Owner")
    owner.token = token
    await owner.save()
    return token
}

const Owner = mongoose.model('Owner', ownerSchema)
const Dog = mongoose.model('Dog', dogSchema)

/*******************************************************
 *  Creat express app
 *******************************************************/

const app = express()
app.use(express.json())

const port = process.env.PORT || 4000


/******************************************************** 
 * middleware function
**********************************************************/
const auth = async (req,res,next) => {
    
  try {
    const token = req.header("Authorization").replace("Bearer ", "")
    const decoded = jwt.verify(token, "Dog Owner")
    console.log(decoded)
    const owner = await Owner.findOne({_id: decoded._id, token: token })


    if(!owner){
        throw new Error()
    }

    req.token = token
    req.owner = owner
    next()
  } catch (error) {
      res.status(401).send("Unable to authenticate")
  }
}




/*******************************************************
 * Create Routes
 *********************************************************/

app.post('/owners', async (req,res) => {

    const owner = new Owner(req.body)
    try {
        const token =  await owner.generateAuthToken()
        res.status(201).send({owner, token})
    } catch (error) {
        res.status(500).send(error)
    }
})



app.post('/dogs',auth, async (req,res) => {
    const dog = new Dog({
        ...req.body,
        owner: req.owner._id})
    console.log(dog)
    try {
        await dog.save()
        res.status(201).send(dog)
    } catch (error) {
        res.status(400).send(error)
    }
} )


app.get('/dogs',auth, async (req,res) => {

    try {
        
    } catch (error) {
        
    }
})



/*************************************************************
 * Load the server
 ***********************************************************/
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


const getDogDetails = async () => {
    const dog = await Dog.findById('5fdf6cafc45b5e52cc77ace2')
    await dog.populate('owner').execPopulate()
    //console.log(dog.owner)
}

const getOwnerDetails = async () => {
    const dogOwner = await Owner.findById('5fdf712e9cb6035a54c9f0f0')
    await dogOwner.populate('dogs').execPopulate()
    //console.log(dogOwner)
    console.log(dogOwner.dogs)
}

getDogDetails()
getOwnerDetails()