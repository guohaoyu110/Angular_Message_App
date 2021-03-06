const express = require("express");
const bodyParser = require("body-parser");
const Post = require('./models/post') // define a new obejct based on
const mongoose = require("mongoose");
const path = require("path");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const app = express();

//node-angular represents the database name
mongoose.connect("mongodb+srv://haoyuguo:haoyuguo@cluster0.wxy6p.mongodb.net/node-angular?retryWrites=true&w=majority",
 {useNewUrlParser: true, useUnifiedTopology: true}
 )
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');

  });
//connect to mongodb whenever your Node server starts
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images",express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers", //it should be Headers, not header
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


app.use("/api/posts", postsRoutes);
app.use("/api/user",userRoutes);
module.exports = app;
