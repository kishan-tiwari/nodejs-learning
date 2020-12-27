const  mongoose = require('mongoose');
const config = require('./config');

module.exports = mongoose.connect(config.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true }, (err, success)=>{
    try {
        if(err) throw err;
        if(success) throw `Connection Established To Database.`;
        
    } catch (err) {
        console.log(err);
    };
});
