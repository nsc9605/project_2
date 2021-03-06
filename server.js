// Dependencies
require('dotenv').config();
const express = require('express');
const db = require('./models');
const app = express();
// Serve static content for the app from the 'public' directory in the application directory.
app.use(express.static('public'));
const controller = require('./controllers/luck_controller');


// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const exphbs = require('express-handlebars');

// Set Handlebars
app.engine(
  'handlebars', 
  exphbs({ 
    defaultLayout: 'main',
    helpers: {
      renderUrl: (value) => (value === '/odds' ? true : false),
    }, 
  })
);
app.set('view engine', 'handlebars');

// Import routes and give the server access to them.
const routes = require('./routes/html-routes.js');

// app.use(routes);
routes(app);
app.use(controller);

var PORT = process.env.PORT || 8080;
db.sequelize.sync().then(() => {
  // Start our server so that it can begin listening to client requests.
  app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log('Server listening on: http://localhost:' + PORT);
  });
});
