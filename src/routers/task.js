const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

router.post('/tasks',auth, async (req,res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    console.log(task)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(500).send(error)
    }

   
})



router.get('/tasks',auth, async (req, res) => {
    const match = {}
    const sort = {}

    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc'? -1 : 1
    }

    try {
        await req.user.populate({
            path: "user_tasks",
            match, // can you write your own functions for this file
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }}
            ).execPopulate()
        res.send(req.user.user_tasks)
    } catch (error) {
        res.status(500).send(error)
    }
   
})

router.get('/tasks/:id',auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({_id, owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.send(500).send(error)
    }
})

router.patch("/tasks/:id", auth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description", "completed"]
    const isValidUpdate = updates.every((update) => (allowedUpdates.includes(update)))
    if(!isValidUpdate){
        return res.status(400).send({ error: "Invalid updates"})
    }

    try {
        const _id = req.params.id
        const task = await Task.findOne({_id, owner: req.user._id})


        //const task = await Task.findByIdAndUpdate(req.params.id,req.body, {new: true, runValidators: true})
        if(!task){
            return res.status(404).send()
        }

        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})




router.delete('/tasks/:id',auth,  async (req, res) => {

    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})



module.exports = router