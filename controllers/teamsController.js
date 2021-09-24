// Route for getting all of a program's teams
//      GET to /programs/:programId/teams
// Article Show Route
    //  GET to /programs/:programId/teams/:teamId

    const router = require('express').Router();
    const db = require('../models')
    
    
    // index teams route
    
    // do we need this to render as a page? probably not, the articles should be indexed on the city show page anyway
    // either way, would need to know how to return the JSON object with only the articles per city
    
    // router.get('/:programId/teams', (req,res)=>{
    //     db.Program.findById(req.params.programId, (err, foundProgram)=>{
    //         console.log('hello from index teams route the found teams render')
    //          if (err) return console.log(err)
            
    //         console.log(foundProgram.teams)
    //         res.json(foundProgram)
            
    //     })
       
    // })
    
    // show team route
    
    router.get('/:programId/:teamId', (req,res) =>{
        console.log('hit the SHOW route')
        console.log(req.params.programId)
        //look thought Program object to get the id, then find teams in that
        // db.Program.findById(req.params.programId, (err, foundProgram) => {
        //     if (err) return console.log(err)
        //     console.log('found' + foundProgram.teams)
        //     //return those found teams ina  new array, this is not essential but cleans up the code a little
        //     const teamsArray = [...foundProgram.teams]
        //     console.log('programs array log' , teamsArray)
        //     console.log(req.params.teamId)
        //     //this searches the team array for the team with the same id as in the url and stores it as a variable
            
        //     const foundTeam = teamsArray.find((team)=>{
        //     // note the == here, the team._id is a string but req.params.articleId is acutally a differnt datatype called an object ID, strict equality will match datatypes and fail, so use the double equals
        //     return team._id == req.params.teamId
             
        //     })
        //     console.log(foundTeam)
        //     //now we render out that found article on the page, 
        //     res.json(foundTeam)
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
    
    // update  route GOOD GOD \

    router.get('/:programId/:teamId/edit', (req,res)=>{
        // db.Program.findById(req.params.programId, (err, foundProgram) => {
        //     if (err) return console.log(err)
        //     console.log('found' + foundProgram.teams)
        //     //return those found teams ina  new array, this is not essential but cleans up the code a little
        //     const teamsArray = [...foundProgram.teams]
        //     console.log('programs array log' , teamsArray)
        //     console.log(req.params.teamId)
        //     //this searches the team array for the team with the same id as in the url and stores it as a variable
            
        //     const foundTeam = teamsArray.find((team)=>{
        //     // note the == here, the team._id is a string but req.params.articleId is acutally a differnt datatype called an object ID, strict equality will match datatypes and fail, so use the double equals
        //     return team._id == req.params.teamId
             
        //     })
        //     console.log(foundTeam)
        //     //now we render out that found article on the page, 
        //     res.json(foundTeam)
        // })
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