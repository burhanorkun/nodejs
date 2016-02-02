/**
 * Created by TCBORKUN on 20.12.2015.
 */
var http = require("http");
var person = {
    name: "Veli",
    surname: "Demir",
    age: 26,
    araba :[{
        marka: "Mercedes",
        model: 2011
    }, {
        marka: "BMW",
        model: 2015
    }]
};
var server = http.createServer(function (req, resp) {
    resp.writeHead(200, {"Content-Type": "application/json;charset=UTF-8"});
    resp.end(JSON.stringify(person));
});
server.listen(8080, "localhost", function () {
    console.log("Server started..", 8080, "localhost");
});