var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/school");

var bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number
}, {versionKey: false});

var Book = mongoose.model("Book", bookSchema);

var book = new Book({
    name: "NodeJS at Turkcell",
    author: "Burhan ORKUN",
    price: 25.5
});

book.save(function (err, saved) {
    if (err) throw err;

    // saved
    console.log(saved._id);
    console.log("toObject",saved.toObject());

});