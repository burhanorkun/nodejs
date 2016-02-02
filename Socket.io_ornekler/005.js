var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + "/public", {index: "005.html"}));

io.sockets.on("connection", function (socket) {

    socket.on("ilan_kutusu", function (data) {
        socket.broadcast.emit("sari_sayfalar", data); // Sen hariç herkese
    });

});

server.listen(8080);