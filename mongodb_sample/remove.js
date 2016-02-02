var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/school");

var bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number
}, {versionKey: false});

var Book = mongoose.model("Book", bookSchema);

Book.findOneAndRemove({_id: "568181a5d7c66b041a8addde"}, function (err, removed) {
    if (err) throw err;
    if (removed)
        console.log(removed._id);
});
