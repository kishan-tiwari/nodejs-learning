const mongoose = require('mongoose');
const config = require('../config');


//Mongodb connection
 mongoose.connect(config.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true });

//Connection polling
mongoose.connection.on('connected', () => {
    console.log("Mongoose default connection is open to ", config.MONGO_URI);
  });