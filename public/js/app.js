var socket = io();
socket.on('connect', function () {
    console.log('Conectado ap servidor socket.io!');
});

socket.on('mensagem', function (message) {
    console.log('nova mensagem:');
    console.log(message.text);
})