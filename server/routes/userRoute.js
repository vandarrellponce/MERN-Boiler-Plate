const express = require('express')
const User = require('../models/user')
const router = express.Router()
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')

// REGISTER USER
router.post('/api/users/register', async(req, res) => {
    try {
        const user = new User(req.body)
        const token = user.generateToken()
        await user.save()
        /* res.cookie('x_token', token).send({success: true, user}) */
        res.send({success: true, user, token})
    } 
    catch (error) {
        res.status(400).send(error.message)
    }
})

// LOGIN USER
router.post('/api/users/login', async(req, res) => {
    try {
        // Find Email
        const user = await User.findOne({email: req.body.email})
        if(!user) throw new Error('Incorrect Email')

        // Compare Password
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch) throw new Error('Incorrect Password')
        
        // Generate Token
        const token = user.generateToken()
        await user.save()

        res
        .cookie('x_token', token)
        .send({success: true, user, token})
       /*  res.send({success: true, user, token}) */
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})
// LOGOUT USER
router.get('/api/users/logout', auth, async(req, res) => {
    try{
        // Delete the token from the user's array of tokens
        req.user.tokens = req.user.tokens.filter( token => token.token !== req.token)
        await req.user.save()

        res.send('User sucessfuly logged out')
    }
    catch(e){
        res.status(500).send(e.message)
    }
})
// LOG OUT ALL SESSIONS
router.post('/users/logoutall', auth, async(req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save()
        res.send('Logged out from all sessions')
    } 
    catch (error) {
        res.status(500).send(e.message)
    }
    
})
// GET USER PROFILE
router.get('/api/users/profile', auth, async(req, res) => {
    res.send(req.user)   
})


module.exports = router