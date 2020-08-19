const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/userRoute')
const key = require('./config/key')
const cors = require('cors')

// Database Connection
mongoose.connect(key.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then( client => {
    console.log('DB Connected')
})
.catch( err => console.log(err))

// App Configuration and Middlewares
const app = express()
app.use(express.json())
app.use(cookieParser())

// App Routes
app.use(userRouter)
app.get('/api/test', (req, res) => {
    res.send('Test message from the server')
})

// Port config and server launching
const port = process.env.PORT || 5001
app.listen(port, () => {
    console.log('Server running on localhost port ' + port)
})