const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({

    post: String,
    img: String,
    location: String,
    date: { type: String, default: Date }

})


const Posts = mongoose.model('Posts', postSchema)
module.exports = Posts
