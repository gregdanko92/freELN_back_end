const db = require('./models');
const data = require('./programData.json');



(async function() {
    await db.Program.deleteMany({});
    await db.Team.deleteMany({});
    await db.ExperimentDirectory.deleteMany({});
    await db.Experiment.deleteMany({});


    // let programs = data[0]
    // delete data[0]
    // console.log(programs)
    // console.log(data.programs)
    const newPrograms = await db.Program.create(data.programs);
    console.log(newPrograms)

//
    //old
    let teams = data.programs[0].teams
    console.log(teams)
    delete data.programs[0].teams
    const newTeam = await db.Team.create(teams);
    console.log(newTeam)
    //new
    // let teams = programs[0].teams
    // delete programs[0].teams
    // const newTeam = await db.Team.create(teams);
    // console.log(newTeam, ' NEW')

//
    let exdir = teams[0].experimentDirectories
    delete teams[0].experimentDirectories
    const newExDir = await db.ExperimentDirectory.create(exdir)
    console.log(newExDir)
    
//
    let experiments = newExDir[0].experiments
    delete newExDir[0].experiments
    const newExperiment = await db.Experiment.create(experiments)
    console.log(newExperiment)

    // did below with henry, but i think it is flawed
    // const newTeam = await db.Team.create(experimentDirectories[0]);
    // console.log(newTeam)

    // let experimentDirectories = teams[0].experimentDirectories
    // delete teams.experimentDirectories
    // console.log(experimentDirectories)
    

    // const newExDir = await db.ExperimentDirectory.create(data.programs[0].teams[0].experimentDirectories);
    // console.log(newExDir)

    // const newExDir = await db.ExperimentDirectory.create(experiments);
    // console.log(newExDir)

    // // // // // // updateds // // // // // //
    const updatedExDir = await db.ExperimentDirectory.findByIdAndUpdate(newExDir[0]._id, {$push:{experiments:newExperiment}}, {new: true})
    console.log(updatedExDir, 'UPDATED EXDIR')

    const updatedTeam = await db.Team.findByIdAndUpdate(newTeam[0]._id, { $push:{ experimentDirectories: updatedExDir} }, { new: true });
    console.log(updatedTeam, "UPDATED TEAM")

    const updatedProgram = await db.Program.findByIdAndUpdate(newPrograms[0]._id, { $push: {teams: updatedTeam} }, { new: true } );
    console.log(updatedProgram, 'new log')

    process.exit();
}());

// Delete
// db.Program.deleteMany({}, (err, result) => {
//     db.Team.deleteMany({},(err,result)=>{
//         db.ExperimentDirectory.deleteMany({},(err, result)=>{
//             if (err) {
//               console.log(err);
//               process.exit();
//             }
//             if (err) {
//               console.log(err);
//               process.exit();
//             }
//             if (err) {
//               console.log(err);
//               process.exit();
//             }
//             console.log(result.deletedCount, 'program deleted')
//             let teams = []
//             let experimentDirectories = []
//             for (let i=0;i<data.programs.length;i++){
//                 console.log(data.programs[i])
//                 teams.push(data.programs[i].teams || [])
//                 delete data.programs[i].teams
//             }
//             for (let i=0;i<data.programs[i].teams[i].length;i++){
//                 for (let k=0;k<data.programs[i].teams[k].length;k++){
//                     experimentDirectories.push
//                 }

//             }
//             console.log('data. cities console log', data.programs)
//             console.log('teams console ', teams)
//             console.log('experiment directory', experimentDirectories)
//         })
        
//         // Create
//         db.Program.create(data.programs, (err, seededPrograms) => {
//           if (err) {
//             console.log(err);
//             process.exit();
//           db.Team.create(teams[0], (err, newTeam)=>{
//               if(err){
//                   console.log(err)
//                   process.exit()
//               }
//               db.ExperimentDirectory.create(experimentDirectories[0], (err,newExDirectory)=>{
//                   if(err){
//                       console.log(err)
//                       process.exit()
//                   }

//                   console.log('result console log: ', result)
//                 //   seededPrograms[0].teams.push(newTeam)
//                 //   seededPrograms[0].teams[0].push(newExDirectory)
//                   db.Team.findByIdAndUpdate(newTeam._id, { $push: {experimentDirectories:newExDirectory}}, (err, updatedTeam) => {
//                     if(err){
//                         console.log(err)
//                         console.lof(updatedTeam)
                        
//                         process.exit()
//                     }
//                     db.Program.findByIdAndUpdate(seededPrograms[0]._id, { $push: {teams:updatedTeam} },(err)=>{
//                         if(err) return console.log(err)
//                         process.exit()
                      
//                             })
//                         })
//                     })
//                 });
//             })
//         })
//     })
// })