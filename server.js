// Importing packages
const express = require('express');
const path = require('path');
const session = require('session');
const exphbs = require('express-handlebars');

// Import routes and helpers
const routes = require('./controllers');
const helpers = require('./utils/helpers');

// Importing Sequelize connect object and connect-session-sequelize
const sequelize = require('./config/connection'); 
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001; // Will pull a port from an environment variable or select 3001

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Set up sessions
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 60 * 60 * 1000, // Expires every hour
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })

// Set up sessions as middleware
app.use(session(sess));

// Have Express use handlebars engine and use set method
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes); 

sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log('Now listening'));
});

