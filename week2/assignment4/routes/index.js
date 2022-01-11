const express = require('express');
const path = require('path');

const rootDir = require('../util/path');

const router = express.Router();

const usersList = [];

router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'index.html'));
    res.render('/', {users: usersList})
});

router.post('/', (req, res, next) => {
    usersList.push(req.body.name);
    res.redirect('/users');
});


module.exports = router;