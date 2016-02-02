/**
 * Created by TCBORKUN on 20.12.2015.
 */
var turkcell = require("turkcell");
var express = require("express");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var app = express();
//app.use(cookieParser());
app.use(session({secret:"express js"}));

app.get("/sonuc", function (req, resp) {
    var session = req.session;
    if (!session.name)
        resp.json(404, {message: "Name alani set edilmedi, Or: /api/ali "});
    else {
        encodedValue = session.name;
        decodedValue = turkcell.decode(encodedValue, 'cok gizli');
        //resp.json({encodeText: encodedValue,
        //           decodeText: decodedValue});
        //resp.end('<table><tr><th>Encoded Text => </th><th>'+encodedValue+'</th></tr><tr><td>Decoded Text => </td><td>'+decodedValue+'</td></tr></table>');
        resp.end('<h1>Encoded Text => '+encodedValue+'</h1><br><h1>Decoded Text => '+decodedValue+'</h1>');
    }
});

app.get("/api/:name", function (req, resp) {
    var session = req.session;
    var nameValue = req.param("name");
    var keyValue = 'cok gizli';
    var encodedText= turkcell.encode(nameValue, keyValue)
    session.name = encodedText;
    resp.redirect("/sonuc");
});
app.listen(8080, function(){
    console.log('Server started.. port:', 8080);
});