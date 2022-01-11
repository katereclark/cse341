const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const users = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/users', (req, res, next) => {
  res.render('users', {users: users,});
});

app.post('/add-user', (req, res, next) => {
  users.push({name: req.body.username});
  res.redirect('/users');
});

app.listen(3000);
