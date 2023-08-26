const mongoose = require('mongoose');


// Define the schema for the "user" collection
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  image: String,
  phoneNumber: String,
  city: String,
});

// Define the schema for the "blogs" collection

// Create models based on the schemas
const User = mongoose.model('User', userSchema);

module.exports = { User };
