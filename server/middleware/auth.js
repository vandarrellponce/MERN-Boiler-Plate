const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async(req, res, next) => {
    try {
        // Get the token from the header or from the cookie
        const token = req.cookies.x_token
        /* const token = req.header('Authorization').replace('Bearer ', '') */

        // Decode token if still valid
        const decoded = jwt.verify(token, 'secret')

        // If token is valid, find the user with _id in the tokens payload
        // and check if that token is still in the user's tokens array 
        const user = await User.findOne({'_id': decoded._id, 'tokens.token':token})
        if(!user) throw new Error('Invalid token, Please authenticate')

        // Attach user and token to the request
        req.user = user
        req.token = token
        next()
    } 
    catch (e) {
        res.status(400).send(e.message)
    }
    

}

module.exports = auth;