var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/school");

var bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number
}, {versionKey: false});

var Book = mongoose.model("Book", bookSchema);

Book.findOneAndUpdate({_id: "56817f7ea0889aac2dd2c58d"}, {price: 35}, function (err, updated) {
    if (err) throw err;

    if (updated)
        console.log(updated.price);
});