/**
 * Created by TCBORKUN on 21.12.2015.
 */
var express = require("express");
var app = express();
app.get("/", function (req, resp) {
    resp.send("Merhaba Turkcell");
});
app.listen(8080);