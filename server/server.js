const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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
    // socket.emit from Admin, text Welcome to the chat app
    // socket.broadcast.emit from Admin, text New user joined
    
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to NodeChat app',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    })

    socket.on('createMessage', (msg) => {
        console.log('createMessage', msg);
        // io.emit('newMessage', {
        //     from: msg.from,
        //     text: msg.text,
        //     createdAt: new Date().getTime()
        // });
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
