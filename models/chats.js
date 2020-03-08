const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message: {
    type: String,
    default: ''
  },
  username: {
    type: String,
    required: true
  }
},{
  timestamps: true
});

const chatSchema = new Schema({

  usernameA: {
    type: String,
    required: true
  },
  usernameB: {
    type: String,
    required: true
  },
  messages: [ messageSchema ]
},{
  timestamps: true
});

var Chats = mongoose.model('Chat', chatSchema);

module.exports = Chats;
