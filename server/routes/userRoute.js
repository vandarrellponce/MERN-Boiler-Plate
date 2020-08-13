const express = require('express')
const User = require('../models/user')
const router = express.Router()

router.post('/users/register', async(req, res) => {
    try {
        const user = new User(req.body).save()
        res.send({user, token})
    } 
    catch (error) {
        res.status(404).send()
    }
})

module.exports = router