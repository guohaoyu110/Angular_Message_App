const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// const { route } = require("./posts");
const User = require("../models/user");
const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10 )
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
        //req.body.password//don't save the password like this
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User crated!',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });
  // create a new user and store it in the database
  // password还是模糊化了，看不出来

});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      // the user object only exists in the first then block, not the second one
      console.log(user);

      if (!user){
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
      // we hashed it ,with bcrypt

    })
    .then(result => {
      console.log(result);
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        {email: fetchedUser.email, userId: fetchedUser._id},
        'secret_this_should_be_longer',
        {expiresIn: "1h"}
        );
        // enter our own secret, our own pasword
      console.log(token);
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});

module.exports = router;

