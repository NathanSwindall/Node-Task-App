const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const {sendToDeletedUser,sendToNewUser} = require('../email/account')


router.post('/test', async (req,res) => {
    const user = new User(req.body)
    console.log("here")
    try {
        console
        await user.save()
        res.send()
    } catch (error) {
        res.status(400).send(error)
    }
})


router.post('/users', async (req, res) => {
    const user = new User(req.body)
    
    try {
        sendToNewUser(user.email,user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (error) {
        res.status(401).send({error: "Unable to authenticate"})
    }
})


router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/logoutAll', auth, async (req,res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
        
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/users/me', auth, async (req,res) => {
    res.send(req.user)
})

// I should probably delete this path
router.get('/users',auth, async (req,res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
 
})





router.patch('/user/me',auth, async (req,res) => {
    const userUpdates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = userUpdates.every((update) => allowedUpdates.includes(update))
    
    if(!isValidOperation){
        return res.status(400).send({ error: "Invalid updates!"})
    }

    try {
        // const user = await User.findById(req.params.id)
        
        userUpdates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save() // where out middleware actually changes. 
        res.send(req.user)
    } catch (error) {
        res.status(400).send(error)
    }
})


router.delete('/user/me',auth, async (req,res) => {
     

    try {
        sendToDeletedUser(req.user.email, req.user.name)
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})


const upload = multer({
    limits: {
        filesize: 1000000 // This number is in bytes. 1 mb is 1 with six zeros
    },
    fileFilter(req, file, cb){ // cb is callback
        if(!file.originalname.match(/\.(jpeg|png|jpg)$/)){
            cb(new Error('File must be a certain format'))
        }
        
        cb(undefined, true)
    }
})


router.post('/user/me/avatar',auth, upload.single("avatar"), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer() // returns a promise so you need the await keyword
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(404).send({error: error.message})
})

router.delete('/user/me/avatar', auth, async (req,res) => {

    try {
        req.user.avatar = undefined
        await req.user.save()
        res.send("Your avatar was deleted")
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/users/:id/avatar', async (req,res) => {
    try {
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar){
            throw new Error()
        }
        res.set("Content-Type","imgage/jpg")
        res.send(user.avatar)
    } catch (error) {
        res.status(404).send({error: "Something went wrong"})
    }
})


module.exports = router

//regex101.com
//jsbin.com