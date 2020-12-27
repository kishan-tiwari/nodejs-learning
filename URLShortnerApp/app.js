const express = require('express');
const bodyParser = require('body-parser');
const morganBody = require('morgan-body');
const randomString = require('randomstring');
const mongoose = require('mongoose');


const APP_PORT = 4444;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }));

morganBody(app);



//db connection
mongoose.connect('mongodb://localhost/urlshortdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, (err)=>{
  if (err) {
  console.log("MongoError : ", err)
  }
});

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UrlShort = new Schema({
  id : String,
  url : {
    type: String,
    required: true
  },
  date : Date 
})

const URLModel = mongoose.model('urlshort', UrlShort);

const shortFunc = async(req, res)=>{
  const { url }  = req.body;
  const id = randomString.generate(5);
  
  const payload = new URLModel({ id: id, url: url });

  await payload.save((err, data)=>{
    if(err) return console.error(err);
    res.status(200).json({
      statusCode : 200,
      id : data.id,
      message : 'short url created'
    })
  })
}

const getURL = async (req, res)=>{
  const id = req.params.id;
  const data = await URLModel.find({id : id})
  res.redirect(301, `${data[0].url}`)
}

app.post('/short', shortFunc);
app.get('/:id', getURL)

app.listen(APP_PORT,  ()=>{
  console.log(`App running on ${APP_PORT}`)
})