const jwt = require('jsonwebtoken');
const PRIVATE_KEY = 'cs568-2023-09'

function auth(req, res, next){
  try {
    if(!req.headers.authorization){
      return res.send({success: false, error: "Please add the header's authorization to the request"});
    }
    const arr = req.headers.authorization.split(" ");
    if(arr.length !== 2){
      return res.send({success: false, error: "Please use the Bearer scheme"})
    }
    const token = arr[1];
    let decoded = jwt.verify(token, PRIVATE_KEY);
    req.email = decoded.email;
    next();
  } catch (error) {
    res.send({success: false, error: "Wrong token"});
  }
}

function createToken(user){
  const token = jwt.sign({email: user.email}, PRIVATE_KEY);
  return token;
}

module.exports = { 
  auth,
  createToken
}