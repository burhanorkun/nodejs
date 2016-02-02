/**
 * Created by TCBORKUN on 19.12.2015.
 */
var http = require("http");
var server = http.createServer(function (req,resp) {
    resp.writeHead(200,{"Content-Type":"text/plain;charset=UTF-8"});
    resp.end("Merhaba Dünya");
});
server.listen(8080, "localhost", function () {
    console.log("Server started..", 8080, "localhost");
});