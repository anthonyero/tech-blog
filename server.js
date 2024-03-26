// Importing packages
const express = require('express');
const path = require('path');
const session = require('session');
const exphbs = require('express-handlebars');

// Import routes and helpers

// Importing Sequelize connect object and connect-session-sequelize
const sequelize = require('./config/connection'); 
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001; // Will pull a port from an environment variable or select 3001

// Set up Handlebars.js engine with custom helpers


// Set up sessions


// Set up sessions as middleware


// Add Handlebars

// Have Express use handlebars engine and use set method

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(routes); 

sequelize.sync({ force: false}).then(() => {
	app.listen(PORT, () => console.log('Now listening'));
});

