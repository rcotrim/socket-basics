var PORT = process.env.PORT || 3000;
var express = require('express');
var moment = require('moment');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

var clientInfo = {};

//Send current Users to provided socket
function sendCurrentUsers (socket) {
    var info = clientInfo[socket.id];
    var users = [];

    if (typeof info === 'undefined') {
        return;
    }
    Object.keys(clientInfo).forEach( function (socketId) {
        var userInfo = clientInfo[socketId];
        if (info.room === userInfo.room) {
            users.push(userInfo.name);
        }    
    });
    
    socket.emit('mensagem', {
        name: 'System',
        text: 'Usuários no Chat: ' + users.join(', '),
        timestamp: moment().valueOf()
    });
}

io.on('connect', function (socket) {
    console.log('User conectado via socket.io');

    socket.on('disconnect', function () {
        var userData = clientInfo[socket.id];
        if (typeof userData !== 'undefined') {
            socket.leave(userData.room);
            io.to(userData.room).emit('mensagem', {
                name: 'System',
                text: userData.name + ' saiu da Sala!!',
                timestamp: moment().valueOf()
            });
            delete clientInfo[socket.id];
        }
    });

    socket.on('joinRoom', function (req) {
        clientInfo[socket.id] = req;
        socket.join(req.room);
        socket.broadcast.to(req.room).emit('mensagem', {
            name: 'System',
            text: req.name + ' entrou no Chat!',
            timestamp: moment().valueOf()
        });
    });
    socket.on('mensagem', function (message) {
        console.log('Mensagem recebida: ' + message.text);
        
        if (message.text === '@currentUsers') {
            sendCurrentUsers(socket);
        } else {
            message.timestamp = moment().valueOf();
            io.to(clientInfo[socket.id].room).emit('mensagem', message) //manda para todos inclusive o que enviou
        }
        
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