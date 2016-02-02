/**
 * Created by TCBORKUN on 18.12.2015.
 */
var fs = require("fs");
fs.readFile("./file1.txt", {encoding: "UTF-8"}, function (err, data) {
    if (err) throw err;
    console.log("Data: ", data);
});

console.log("I'm here..");
