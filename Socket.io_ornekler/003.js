var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + "/public", {index: "003.html"}));

io.sockets.on("connection", function (socket) {

    // socket refers to current user

    function Rastgele() {
        var msg = {
            randomNumber: Math.round(Math.random() * 100 + 1),
            generatedTime: Date.now()
        }
        socket.emit("sihirli kutu", msg); // Sadece bana
    }

    setInterval(Rastgele, 5000);
});

server.listen(8080, '0.0.0.0');