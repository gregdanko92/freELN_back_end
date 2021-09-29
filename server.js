
// imports
require('dotenv').config()
const express = require('express');
const programsController = require('./controllers/programsController');
const teamsController = require('./controllers/teamsController');
const experimentDirectoryController = require('./controllers/experimentDirectoryController');
const experimentController = require('./controllers/experimentController');
const cors = require('cors')

// pull in heroku's port if posted on heroku, otherwise, pull in port 4000
const PORT = process.env.PORT || 4000;
const app = express();

// middleware
// TODO: add CORS
//cors allows our express server to accept requests from our react-app
app.use(cors())
// TODO: Add json parsing to get the form data
app.use(express.json());

// API routes
app.use('/api/programs', programsController);
app.use('/api/programs', teamsController);
app.use('/api/programs', experimentDirectoryController);
app.use('/api/programs', experimentController);

// listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});