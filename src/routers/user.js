const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')




router.post('/users', async (req, res) => {
    const user = new User(req.body)
    
    try {
        const token = await user.generateAuthToken()
        await user.save()
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
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router