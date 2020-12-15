const express = require('express')
const router = new express.Router()
const User = require('../models/user')




router.post('/users', async (req, res) => {
    const user = new User(req.body)
    
    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/users', async (req,res) => {
    
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
 
})

router.get('/users/:id',async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if( !user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
    
})

router.patch('/user/:id', async (req,res) => {
    const userUpdates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = userUpdates.every((update) => allowedUpdates.includes(update))
    
    if(!isValidOperation){
        return res.status(400).send({ error: "Invalid updates!"})
    }

    try {
        const user = await User.findById(req.params.id)
        
        userUpdates.forEach((update) => user[update] = req.body[update])
        await user.save() // where out middleware actually changes. 
        
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}) // new gives new user back, run validation for the update
        if(!user){
            return res.status(404).send()
        }

        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/user/:id', async (req,res) => {
     
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send()
        }

        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router