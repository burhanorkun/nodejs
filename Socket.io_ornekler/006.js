var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + "/public", {index: "006.html"}));

io.sockets.on("connection", function (socket) {
    socket.on("onay kutusu", function (data, callback) {
        console.log(data);
        callback("Mesajınız başarıyla iletildi.");
    });
});

server.listen(8080, '0.0.0.0');