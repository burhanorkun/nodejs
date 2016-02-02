var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + "/public", {index: "004.html"}));

function Rastgele() {
    var msg = {
        randomNumber: Math.round(Math.random() * 100 + 1),
        generatedTime: Date.now()
    }

    // io.sockets tum client lari isaret ediyor
    io.sockets.emit("sihirli kutu", msg); // Herkese
}

setInterval(Rastgele, 3000);

server.listen(8080, '0.0.0.0');