const mongoose = require('mongoose');

// Connect to the MongoDB database

const blogSchema = new mongoose.Schema({
    title: String,
    body: String,
    image: String,
    date: Date,
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference the User model
    },
  });
  
  const Blog = mongoose.model('Blog', blogSchema);

  module.exports = { Blog }