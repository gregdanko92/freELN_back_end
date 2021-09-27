const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExperimentSchema = new Schema({
    title:String,
    tags: [],
    experimentDate: String,
    experimentalNotes:String,
    protocolsUsed:[],
    associatedFiles:[]
})

const ExperimentDirectorySchema = new Schema({
    name:String,
    experiments:[]
})

const TeamSchema = new Schema({
    name: String,
    // members:[],
    // experimentDirectories: [
    //     // {
    //     //     type: mongoose.Schema.Types.ObjectId,
    //     //     ref: 'ExperimentDirectory'
    //     // }
    // ]
    date: String,
    content: String,
    text:String,
    file:String
})

const ProgramSchema = new Schema({
  name: String,
//   target: String,
//   startDate: Date,
  description: String,
//   stakeholders:[]
    date:String,
    teams:[]

  
}, {
    strictPopulate:false
});

const Program = mongoose.model('Program', ProgramSchema);

const Team = mongoose.model('Team', TeamSchema);

const ExperimentDirectory = mongoose.model('ExperimentDirectory', ExperimentDirectorySchema);

const Experiment = mongoose.model('Experiment', ExperimentSchema);

module.exports = {Program, Team, ExperimentDirectory, Experiment}

