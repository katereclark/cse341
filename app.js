const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const PORT = process.env.PORT || 3000;

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const corsOptions = {
  origin: "https://cse341-cloud.herokuapp.com/",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// const options = {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
//   family: 4,
// };

app.use((req, res, next) => {
  User.findById('61f450a4cf5a4c1a7807b711')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://katerclark:Eoieu2PwYb0RUrhI@cluster0.perjr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Kate',
          email: 'kate@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });
