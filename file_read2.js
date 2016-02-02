/**
 * Created by TCBORKUN on 18.12.2015.
 */
var fs = require("fs");
var data = fs.readFileSync("./file1.txt", {encoding: "UTF-8"});
console.log("Data: ", data);
console.log("I'm here..");