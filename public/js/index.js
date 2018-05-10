let socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', (msg) => {
    console.log('New message');
    $('#allmsg').append(`<li>${msg.from}: ${msg.text}</li>`);
    $('#msg-panel')[0].scrollTo(0, 100000);
});

// handle html and form to send message
$('#sendbtn').on('click', (e) => {
    e.preventDefault();
    if ($('#msg').val() === ''){
        $('#msg').val('').focus();
        return;
    }
    $(this).attr('disabled','disabled');
    socket.emit('createMessage', {
        from: 'user',
        text: $('#msg').val()
    }, (retval) => {
        $('#msg').val('').focus();
        $(this).removeAttr('disabled');
    });
});