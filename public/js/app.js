var nome = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();

jQuery('.room-title').text(room);

console.log(name + ' deseja entrar na sala ' + room)

socket.on('connect', function () {
    console.log('Conectado ap servidor socket.io!');
    socket.emit('joinRoom', {
        name: nome,
        room: room
    });
});

socket.on('mensagem', function (message) {
    var momentTimestamp = moment.utc(message.timestamp);
    var $message = jQuery('.messages');
    console.log('nova mensagem:');
    console.log(message.text);
    $message.append('<p><strong>' + message.name + " - " + momentTimestamp.local().format('H:mm') + '</strong>' + '</p>');
    $message.append('<p>'+ message.text + '</p>');
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
    event.preventDefault();
    
    var $message = $form.find('input[name=message]');

    socket.emit('mensagem', {
        name: nome,
        text: $message.val()
    });

    $message.val('');
});