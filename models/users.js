const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* The every has unique username and has to be over 18 years */
const userSchema = new Schema({

  username: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    min: 18,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  devices: {
    type: Array,
    required: true
  }
},
{
  timestamps: true
});

var Users = mongoose.model('User', userSchema);
module.exports = Users;
