var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + "/public", {index: "001.html"}));

io.sockets.on("connection", function (socket) {
    socket.on("çöp kutusu", function (data) {
        console.log("Çöp: ", data);
    });

    socket.on("takı kutusu",function(data){
        console.log("Takı: ", data);
    });
});

server.listen(8080);



















//nodejs kurulu oldugundan
// $>npm install dersek package.json dosyasındaki bağımlılıklari indirir.

// bower kurarak bagimli oldugumuz js objelerini indirebiliriz.
// Not: bower i kurmak icin git kurulu olmasi gerekiyor
//nodejs uzerinden $>npm install bower -g diyerek bower i kurabiliriz.  Not: -g ile global olarak bilgisayarimiza kurulum yapabiliriz.
//bower i kurmak icin html in kullandigi klasore gidip $>bower install diyerek bagimli oldugu js dosyalarini indirebiliriz.
//bower bagimliliklarini bower.json dosyasinda bakiyoruz
