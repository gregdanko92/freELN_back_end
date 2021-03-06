const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/programlib';

const configOptions = {
  useNewUrlParser: true,
//   useCreateIndex: true,
  useUnifiedTopology: true,
//   useFindAndModify: false,
};

mongoose.connect(connectionString, configOptions)
  .then(() => console.log('MongoDB successfully connected...'))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));

module.exports = {
  Program: require('./Program').Program,
  Team: require('./Program').Team,
  ExperimentDirectory: require('./Program').ExperimentDirectory,
  Experiment: require('./Program').Experiment
};
// Atlas connection string
//mongodb+srv://gregdanko92:<password>@cluster0.8n1fi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority