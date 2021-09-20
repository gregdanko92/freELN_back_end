// const { syncBuiltinESMExports } = require('node:module');
const db = require('./models');
const data = require('./programData.json');

// Delete
db.Program.deleteMany({}, (err, result) => {
    db.Team.deleteMany({},(err,result)=>{
        db.ExperimentDirectory.deleteMany({},(err, result)=>{
            if (err) {
              console.log(err);
              process.exit();
            }
            if (err) {
              console.log(err);
              process.exit();
            }
            if (err) {
              console.log(err);
              process.exit();
            }
            console.log(result.deletedCount, 'program deleted')
            let teams = []
            let experimentDirectories = []
            for (let i=0;i<data.programs.length;i++){
                console.log(data.programs[i])
                teams.push(data.programs[i].teams || [])
                delete data.programs[i].teams
            }
            for (let i=0;i<data.programs[i].teams[i].length;i++){
                for (let k=0;k<data.programs[i].teams[k].length;k++){
                    experimentDirectories.push
                }

            }
            console.log('data. cities console log', data.programs)
            console.log('teams console ', teams)
            console.log('experiment directory', experimentDirectories)
        })
        
        // Create
        db.Program.create(data.programs, (err, seededPrograms) => {
          if (err) {
            console.log(err);
            process.exit();
          db.Team.create(teams[0], (err, newTeam)=>{
              if(err){
                  console.log(err)
                  process.exit()
              }
              db.ExperimentDirectory.create(experimentDirectories[0], (err,newExDirectory)=>{
                  if(err){
                      console.log(err)
                      process.exit()
                  }

                  console.log('result console log: ', result)
                //   seededPrograms[0].teams.push(newTeam)
                //   seededPrograms[0].teams[0].push(newExDirectory)
                  db.Team.findByIdAndUpdate(newTeam._id, { $push: {experimentDirectories:newExDirectory}}, (err, updatedTeam) => {
                    if(err){
                        console.log(err)
                        console.lof(updatedTeam)
                        
                        process.exit()
                    }
                    db.Program.findByIdAndUpdate(seededPrograms[0]._id, { $push: {teams:updatedTeam} },(err)=>{
                        if(err) return console.log(err)
                        process.exit()
                      
                    })
                })
            })
        });
    })
})