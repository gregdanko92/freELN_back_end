// imports
const express = require('express');
const programsController = require('./controllers/programsController');
const cors = require('cors')
const port = process.env.PORT || 4000;
const app = express();

// middleware
// TODO: add CORS
//cors allows our express server to accept requests from our react-app
app.use(cors())
// TODO: Add json parsing to get the form data
app.use(express.json());

// API routes
app.use('/api/programs', programsController);

// listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});