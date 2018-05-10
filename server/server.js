const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMsg} = require('./apputils/message');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

/*
socket.emit => emits a message to a single connection
io.emit => emits a message to every single connection
socket.broadcast => emit the event to everyone but the user who sends it
*/
// special event and never add anything to the io object
io.on('connection', (socket) => {
    console.log('New user connected');
    
    socket.emit('newMessage', generateMsg('Admin', 'Welcome to NodeChat app'));
    
    socket.broadcast.emit('newMessage', generateMsg('Admin', 'New user joined'));
    
    socket.on('createMessage', (msg, callback) => {
        console.log('createMessage', msg);
        io.emit('newMessage', generateMsg(msg.from, msg.text));
        callback('message created');
        // socket.broadcast.emit('newMessage', {
        //     from: msg.from,
        //     text: msg.text,
        //     createdAt: new Date().getTime()
        // });
    });
    
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
