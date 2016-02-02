var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + "/public", {index: "002.html"}));

io.sockets.on("connection", function (socket) {
    socket.on("çöp kutusu", function (data) {
        console.log("Çöp: ", data);
        socket.emit("geri bildirim",data + " çöpü attınız.");
    });
    socket.on("takı kutusu", function (data) {
        console.log("Takı: ", data);
        socket.emit("geri bildirim",data + " takısı attınız.");
    });
});

server.listen(8080);