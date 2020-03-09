#!/usr/bin/node

const express = require('express');
const http = require('http');
const bParser = require('body-parser');
const mongoose = require('mongoose');

const Users = require('./models/users');
const Chats = require('./models/chats');

const hostname = '0.0.0.0';
const port = 5000;

const url = 'mongodb://35.190.175.59:27017/franle';
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log('Connected to', url);
}, (err) => {
  console.log(err);
});

const app = express();

app.use((req, res, next) => {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('Request:', req.method, req.originalUrl, ip);
  next();
}, bParser.json());

app.get('/users', (req, res, next) => {
  Users.find()
  .then((users) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(users);
  }, (err) => {
    console.log(err);
    next(err);
  })
  .catch((err) => {
    console.log(err);
    next(err);
  });
});

app.post('/users', (req, res, next) => {
  Users.create(req.body)
    .then((user) => {
      res.setHeader('Content-Type', 'application/json');
      res.json(user);
      console.log(user);
    }, (err) => {
      console.log(err)
      next(err)
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

app.get('/users/:username', (req, res, next) => {
  Users.find({
    username: req.params.username
    })
  .then((user) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(user);
  }, (err) => {
    next(err);
  })
  .catch((err) => {
    next(err);
  });
});

app.put('/users/:username', (req, res, next) => {
  Users.findOneAndUpdate({
    username: req.params.username
    },{
    $set: req.body
    },{
    new: true
  })
  .then((user) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(user);
  }, (err) => {
    next(err);
  })
  .catch((err) => {
    next(err);
  });
});

app.delete('/users/:username', (req, res, next) => {
  Users.findOneAndDelete({
    username: req.params.username
  })
  .then(() => {
    res.setHeader('Content-Type', 'application/json');
    res.json({ result: "OK"});
  }, (err) => {
    next(err);
  })
  .catch((err) => {
    next(err);
  });
});

app.post('/chats', (req, res, next) => {
  Chats.create(req.body)
    .then((chat) => {
      res.setHeader('Content-Type', 'application/json');
      res.json(chat);
      console.log(chat);
    }, (err) => {
      console.log(err)
      next(err)
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

app.post('/message/:chatId', (req, res, next) => {
  Chats.findByIdAndUpdate(req.params.chatId, {
      $push: { messages: req.body }
  },{
    new: true
  })
    .then(() => {
      res.setHeader('Content-Type', 'application/json');
      res.json(req.body);
    }, (err) => {
      console.log(err)
      next(err)
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

app.delete('/chats/:chatId', (req, res, next) => {
  Chats.findByIdAndDelete(req.params.chatId)
  .then(() => {
    res.setHeader('Content-Type', 'application/json');
    res.json({result: "OK"});
  }, (err) => {
    next(err);
  })
  .catch((err) => {
    next(err);
  });
});

app.get('/chats/:chatId', (req, res, next) => {
  Chats.findById(req.params.chatId)
  .then((chat) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(chat);
  }, (err) => {
    next(err);
  })
  .catch((err) => {
    next(err);
  });
});

const server = http.createServer(app).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
