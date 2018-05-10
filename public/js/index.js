let socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', (msg) => {
    console.log('New message');
    console.table(msg);
});

socket.emit('createMessage', {
    from: 'Laszlo',
    text: 'Hello'
}, (returnval) => {
    console.log(returnval);
});
