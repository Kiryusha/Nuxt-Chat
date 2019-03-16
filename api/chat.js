const express = require('express');
const chalk = require('chalk');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

server.listen(3001, err => {
  if (err) {
    console.log(chalk.red('Something wrong happened'));
  } else {
    console.log(chalk.green.bold(`Chat is listening on 3001 port`));
  }
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});
