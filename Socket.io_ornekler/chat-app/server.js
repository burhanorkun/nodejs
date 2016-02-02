/**
 * Created by TCBORKUN on 20.08.2015.
 */
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + "/public", {index: "client.html"}));

io.sockets.on("connection", function (socket) {
    socket.on("message box", function(msg){
        socket.broadcast.emit("message to all",msg);   //kendi haric digerlerine
        //io.sockets.emit("message to all",msg);      //herkese gonderilir
    })
});

server.listen(8080);
