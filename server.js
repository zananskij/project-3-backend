//___________________
//Dependencies
//___________________
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection
require('dotenv').config()
const cors = require('cors')

app.use(express.json())
app.use(cors())

//___________________
//Port

const Posts = require('./models/post')
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI, () => {
  console.log('connected')
})

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'))
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI))
db.on('disconnected', () => console.log('mongo disconnected'))

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'))

app.use(express.json()) // returns middleware that only parses JSON - may or may not need it depending on your project

//___________________
// Routes

app.post('/twitter', (req, res) => {
  Posts.create(req.body, (err, CreatedPost) => {
    res.json(CreatedPost)
  })
})

app.get('/twitter', (req, res) => {
  Posts.find({}, (err, foundPost) => {
    res.json(foundPost)
  })
})

app.delete('/twitter/:id', (req, res) => {
  Posts.findByIdAndRemove(req.params.id, (err, deletedPost) => {
    res.json(deletedPost)
  })
})

app.put('/twitter/:id', (req, res) => {
  Posts.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedPost) => {
    res.json(updatedPost)
  })
})

//___________________
//localhost:3000

//___________________
//Listener
//___________________
app.listen(3000, () => console.log('Listening on port:', 3000))
