const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name:{
        required: true,
        type: String,
        maxlength:50,
    },
    lastname:{
        required: true,
        type: String,
        maxlength:50
    },
    email:{
        required: true,
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error('Invalid Email Format')            
        }
    },
    password:{
        required: true,
        type: String,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password must not contain the word password')
            }
        }
    },
    role:{
        required: true,
        type: Number,
        default: 0
    },
    tokens:[{
        token:{
            type:String
        }
    }],
    token:{ type: String },
    tokenExp:{ type: Number },
    avatar:{ type:Buffer }
})
// ADDING SCHEMA MIDDLEWARES
userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    } 
    next()
})

// ADDING METHODS TO USERS
userSchema.methods.generateToken = function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'secret')
    /* user.token = token */
    user.tokens = user.tokens.concat({token})
    return token
}

/* Override toJSON method of a user - TO HIDE PASSWORD AND TOKEN */
userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

const User = mongoose.model('User', userSchema)
module.exports = User
