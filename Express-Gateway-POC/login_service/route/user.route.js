const express = require('express');
const router = express.Router();
const user = require('../controller/user.controller')
router.post('/login', user.login);
router.get('/list',user.list);

module.exports = router;