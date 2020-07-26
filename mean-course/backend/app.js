const express = require("express");
const bodyParser = require("body-parser");
const Post = require('./models/post') // define a new obejct based on
const mongoose = require("mongoose");


const app = express();

//node-angular represents the database name
mongoose.connect("mongodb+srv://haoyuguo:haoyuguo@cluster0.wxy6p.mongodb.net/node-angular?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');

  });
//connect to mongodb whenever your Node server starts
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers", //it should be Headers, not header
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  // const post = req.body;
  // pass from post.js
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result => {
    //console.log(result);
    res.status(201).json({
      message: "Post added successfully", //inspect的时候可以显示出来这个
      postId : createPost._id
    });
  });
  // documents are stored in connections though
  console.log(post);

});

app.put("/api/posts/:id", (req, res, next) => {
  // stored in Mongodb
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({_id: req.params.id},post ).then(result => {
    console.log(result);
    res.status(200).json({message: "Update successful!"})

  })
});


app.get("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "fadf12421l",
      title: "First server-side post",
      content: "This is coming from the server"
    },
    {
      id: "ksajflaj132",
      title: "Second server-side post",
      content: "This is coming from the server!"
    }
  ];
  // use mongoose
  Post.find().then(documents => {
      console.log(documents);
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: documents //加上这个可以在前端页面体现存储mongoose的内容
      });
    });

});

// we must execute it inside this then block because fetching that data is asynchronous task
// so we need to wait for these documents to have arrived, if we execute our response code here
// then node and javascript will simply execute this line but not wait for it to finish
// and immediately jump to this line

// we send a request to access an id property then and this will be dynamically passed ID. so we send the request
//

app.get("/api/posts/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post){
      res.status(200).json(post);
    }
    else{
      res.status(404).json({message: 'Post not found!'});
    }
  })
})



app.delete("/api/posts/:id", (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Post deleted!"});
  });
});

module.exports = app;
