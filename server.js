var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connect', function (socket) {
    console.log('User conectado via socket.io');

    socket.on('mensagem', function (message) {
        console.log('Mensagem recebida: ' + message.text);

        //io.emit - manda para todos inclusive o que enviou
        socket.broadcast.emit('mensagem', message)       //manda para todos menos o que mandou
    })

    socket.emit('mensagem', {
        text: 'Bem vindo à aplicação de Chat'
    });
});

http.listen(PORT, function() {
    console.log('Servidor no ar !!');
})