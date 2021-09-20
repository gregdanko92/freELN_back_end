const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const Experiment = new Schema({
//     title:String,
//     tags: [],
//     experimentDate: String,
//     experimentalNotes:String,
//     protocolsUsed:[],
//     associatedFiles:[]
// })

const ExperimentDirectorySchema = new Schema({
    name:String,
    experiments:[]
})

const TeamSchema = new Schema({
    name: String,
    members:[],
    experimentDirectories: []
})

const ProgramSchema = new Schema({
  name: String,
  target: String,
  startDate: Date,
  teams: [],
  stakeholders:[]
  
});

const Program = mongoose.model('Program', ProgramSchema);
const Team = mongoose.model('Team', TeamSchema);
const ExperimentDirectory = mongoose.model('Experiment Directory', ExperimentDirectorySchema);
// const Experiment = mongoose.model('Experiment', ExperimentSchema);

module.exports = {Program, Team, ExperimentDirectory }

