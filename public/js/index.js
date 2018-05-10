let socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', (msg) => {
    console.log('New message');
    //console.table(msg);
    $('#allmsg').append(`<li>${msg.from}: ${msg.text}</li>`);
    $('#msg-panel')[0].scrollTo(0, 100000);
});

// handle html and form to send message
$('#sendbtn').on('click', (e) => {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'user',
        text: $('#msg').val()
    }, (retval) => {
        $('#msg').val('').focus();
    });
});