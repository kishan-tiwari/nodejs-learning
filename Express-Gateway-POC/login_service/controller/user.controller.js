var User = require('../model/user.model');


const login = async (req, res, next)=>{
  const {username, email, password} = req.body;
  const query = {
    username,
    email,
    password
  };
  const doc = await User.create(query);
  res.status(201).send({
    resCode : 201,
    doc
  })
  next();
}


const list = async (req, res, next)=>{
  User.find({}, (err, docs)=>{
    if(err)  throw err;
    if(docs) throw res.status(200).send({docs});
  })
}






module.exports = {
  login,
  list
}