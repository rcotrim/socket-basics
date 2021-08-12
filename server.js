var PORT = process.env.PORT || 3000;
var express = require('express');
var moment = require('moment');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static(__dirname + '/public'));

io.on('connect', function (socket) {
    console.log('User conectado via socket.io');

    socket.on('mensagem', function (message) {
        console.log('Mensagem recebida: ' + message.text);
        message.timestamp = moment().valueOf();
        io.emit('mensagem', message)  //manda para todos inclusive o que enviou
        //socket.broadcast.emit('mensagem', message)       //manda para todos menos o que mandou
    })

    // timestamp property - JavaScript timestamp (miliseconds)
    socket.emit('mensagem', {
        name: 'System',
        text: 'Bem vindo à aplicação de Chat',
        timestamp : moment().valueOf()
    });
});

http.listen(PORT, function() {
    console.log('Servidor no ar !!');
})