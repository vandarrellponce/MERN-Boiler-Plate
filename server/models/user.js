const mongoose = require('mongoose')
const validator = require('validator')

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

const User = mongoose.model('User', userSchema)
module.exports = User
