// check if A, you do have a token attached to your requests but that doesn't mean that the token is valid
// the second step is that we validate this token and since we use that Json web token package to create the token
// here with the sign method in the user route

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // this is a typical middleware in Node.
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secret_this_should_be_longer");
    next();
  }catch(error) {
    res.status(401).json({message: "Auth failed!"});
  }


}
