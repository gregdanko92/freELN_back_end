// Route for getting all of a program's teams
//      GET to /programs/:programId/teams
// Article Show Route
    //  GET to /programs/:programId/teams/:teamId

    const router = require('express').Router();
    const db = require('../models')
    
    
    // index experimentalDirectory route - ✅
    
    
    router.get('/:programId/:teamId/', (req,res)=>{
        console.log('hello from route')
        db.Team.findById(req.params.teamId, (err, foundTeam)=>{
            console.log('hello from index of experimentalDirectory route')
             if (err) return console.log(err)
            
            console.log(foundTeam.experimentalDirectory, 'EXDIR CONSOLE LOG')
            res.json(foundTeam)
            
        })
       
    })
    
    // show experimentDirectory route  ✅
    
    router.get('/:programId/:teamId/:exDirId', (req,res) =>{
        //look thought Program object to get the id, then find teams in that
        db.Team.findById(req.params.teamId, (err, foundTeam) => {
            if (err) return console.log(err)
            // console.log('found' + foundTeam.experimentDirectories)
            //return those found exdirs ina  new array, this is not essential but cleans up the code a little
            // console.log(foundTeam, ' FOUND TEAM ')
            const exDirArray = [...foundTeam.experimentDirectories]
            // console.log('programs array log' , exDirArray)
            // console.log(req.params.exDirId)
            //this searches the team array for the team with the same id as in the url and stores it as a variable
            
            const foundExDir = exDirArray.find((exDir)=>{
            // note the == here, the team._id is a string but req.params.articleId is acutally a differnt datatype called an object ID, strict equality will match datatypes and fail, so use the double equals
            return exDir._id == req.params.exDirId
             
            })
            // console.log(foundExDir)
            //now we render out that found exDir on the page, 
            res.json(foundExDir)
            
        })
    
    })

    //Post Route ✅
    
    router.post('/:programId/:teamId', (req,res)=>{
        // console.log('hiiiitin it')
        db.ExperimentDirectory.create(req.body,(err, newExDir)=>{
            console.log('CREATED EXDIR')
            if (err) return console.log(err)
            db.Team.findByIdAndUpdate(
                req.params.teamId, { $push: {experimentDirectories: newExDir}}, (err, updatedExDir) =>{
                    if (err) return console.log(err)
                    console.log(updatedExDir)
                    res.json(updatedExDir)
                }
            )
        })
    })
    
    // update articles route GOOD GOD WHAT
    
    // router.put('/:cityId/:articleId', (req,res)=>{
    //     db.Article.findByIdAndUpdate(
    //         req.params.id, // finds the ARTICLE with id passed in from URL
    //         req.body, // passes in data to update a ARTICLE from the req.body
    //         {new: true}, // We want to updated ARTICLE returned in the callback
    //         (err, updatedArticle) => { // function called after update completes
    //           if (err) return console.log(err);
              
    //           res.json(updatedArticle);
    //         });
    // })
    
    // router.put('/:id', (req, res) => {
        
    //   });
    
    
    
    
    // destroy articles route ✅
    router.delete('/:programId/:teamId/:exDirId',(req,res)=>{
        //go low to high, delete from the articles db first, then pass the article that was deleted to the city db. 
        db.ExperimentDirectory.findByIdAndDelete(req.params.exDirId, (err, deletedExDir) => {
            if (err) return console.log(err);
            db.Team.findByIdAndUpdate(
                req.params.teamId,
                { $pull: {experimentDirectories:deletedExDir}},
                {new: true}, // do you want the version with or without changes?, you want the City with the article deleted, therefore new:true. 
                (err, updatedTeam) => {
                    if (err) return console.log(err)
                    res.json(updatedTeam)
                }
            )
          });
    })
    
    module.exports = router