var socket = io();
socket.on('connect', function () {
    console.log('Conectado ap servidor socket.io!');
});

socket.on('mensagem', function (message) {
    console.log('nova mensagem:');
    console.log(message.text);

    jQuery('.messages').append('<p>' + message.text + '</p>')
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
    event.preventDefault();
    
    var $message = $form.find('input[name=message]');

    socket.emit('mensagem', {
        text: $message.val()
    });

    $message.val('');
});