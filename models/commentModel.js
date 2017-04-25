var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema(
   {
     author: String,
     body: String,
     upvotes: Number
});

var comment = mongoose.model("comment", commentSchema);

module.exports = comment ;
