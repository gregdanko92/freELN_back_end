// Route for getting all of a program's teams
//      GET to /programs/:programId/teams
// Article Show Route
    //  GET to /programs/:programId/teams/:teamId

    const router = require('express').Router();
    const db = require('../models')
    
    router.get('/:programId/:teamId', (req,res) =>{
        console.log('hit the SHOW route')
        console.log(req.params.programId)
       
            db.Team.findById(req.params.teamId, (err, foundTeam)=>{
                if(err) return console.log(err)
                res.json(foundTeam)
            })
        })
        
    router.post('/:programId', (req,res)=>{
        db.Team.create(req.body,(err, newTeam)=>{
            console.log('created article')
            if (err) return console.log(err)
            db.Program.findByIdAndUpdate(
                req.params.programId, { $push: {teams: newTeam}}, (err, updatedTeam) =>{
                    if (err) return console.log(err)
                    res.json(updatedTeam)
                }
            )
        })
    })
    // update  route (cleaned up a bit, no?)

    router.get('/:programId/:teamId/edit', (req,res)=>{
        
        db.Team.findById(req.params.teamId, (err, foundTeam)=>{
            if (err) return console.log(err)
            res.json(foundTeam)
        })
    })
        
    
    router.put('/:programId/:teamId', (req,res)=>{
        console.log('hit the put route')
        console.log(req.body, 'REQ>BODY'), // finds the TEAM with id passed in from URL
        db.Team.findByIdAndUpdate(
            req.params.teamId,
            req.body, // passes in data to update a TEAM from the req.body
            {new: true}, // We want to updated TEAM returned in the callback
            (err, updatedTeam) => { // function called after update completes
              if (err) return console.log(err);
              console.log(updatedTeam)
              res.json(updatedTeam);
            });
    })
    
    router.put('/:programId/:teamId', (req, res) => {
        
      });
    
    
    
    
    // destroy articles route
    router.delete('/:programId/:teamId',(req,res)=>{
        //go low to high, delete from the articles db first, then pass the article that was deleted to the city db. 
        db.Team.findByIdAndDelete(req.params.teamId, (err, deletedTeam) => {
            if (err) return console.log(err);
            db.Program.findByIdAndUpdate(
                req.params.programId,
                { $pull: {teams:deletedTeam}},
                {new: true}, // do you want the version with or without changes?, you want the City with the article deleted, therefore new:true. 
                (err, updatedProgram) => {
                    if (err) return console.log(err)
                    res.json(updatedProgram)
                }
            )
          });
    })
    
    module.exports = router