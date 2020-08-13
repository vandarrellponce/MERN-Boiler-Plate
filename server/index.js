const express = require('express')
const mongoose = require('mongoose')

// Database Connection
const dbURL = 'some string'
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then( client => {
    console.log('DB Connected')
})
.catch( err => console.log(err))

// Express App Configuration
const app = express()


const port = process.env.PORT || 6000
app.listen(port, () => {
    console.log('Server running on localhost port ' + port)
})