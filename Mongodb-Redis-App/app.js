const express = require('express');
const redis = require('redis');
const config = require('./config');
const app = express();

//Connect with redis-server
const redisClient = redis.createClient({
    port: 6379,
    host: '127.0.0.1',
    password: 'redis123'
});


//Define headers
app.use((req, res, next)=>{
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.get('/api/v1', (req,res, next)=>{
    res.status(200).send({
        msg: "Hello from Kishan!!"
    });
    next();
});


app.listen(config.PORT, config.HOSTNAME, async ()=>{
        await require('./mongodb');
        redisClient.on("error",(err) => {
            console.log("Error " + err);
        });
        console.log(`App is running ${config.PORT}`);

});

