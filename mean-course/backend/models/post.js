const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true}
  // javascript中，string要大写，typescript是小写的
});

module.exports = mongoose.model('Post', postSchema);




// mongodb+srv://haoyuguo:<password>@cluster0.wxy6p.mongodb.net/<dbname>?retryWrites=true&w=majority
