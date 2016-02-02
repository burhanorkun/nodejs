var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/school");

var bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number
}, {versionKey: false});

var Book = mongoose.model("Book", bookSchema);

Book.find({}, function (err, result) {
    if (err) throw err;
    if (result)
        var bookList = result.map(function (b) {

            return b.toObject();
        });

    console.log(bookList);
});