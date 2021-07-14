const express = require('express');
const mongoose = require('mongoose');
const expresshandlebars = require('express-handlebars');
const todoRoutes = require('./roures/todos');
const path = require('path');
require('dotenv/config');

const PORT = process.env.PORT || 3000;

const app = express();

//settings for the express-handlebars
const hbs = expresshandlebars.create({
  defaultLayout: 'main',
  extname: 'hbs',
});

//engine registration
app.engine('hbs', hbs.engine);

// registration in express
app.set('view engine', 'hbs');
app.set('views', 'views');

//middleware for work with body (form data)
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(todoRoutes);


async function start() {
  // mongoose.connect - сonnect to database
  try {
    await mongoose.connect(
      process.env.DB_CONNECTION,
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    );

    // start server after connect to database
    app.listen(PORT, () => {
      console.log('server has been started...');
    });
  } catch (error) {
    console.log(error);
  }
}

start();
