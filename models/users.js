const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
},{
  timestamps: true
});

var Users = mongoose.model('User', userSchema);

module.exports = Users;
