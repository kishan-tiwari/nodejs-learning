module.exports = {
    PORT : process.env.PORT || 3000,
    HOSTNAME : process.env.HOSTNAME || `127.0.0.1`,
    MONGO_URI : process.env.MONGO_URI ||  `mongodb://aadmin:admin123@localhost:27017/admin`
}