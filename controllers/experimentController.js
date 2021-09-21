// Route for getting all of a program's teams
//      GET to /programs/:programId/teams
// Article Show Route
    //  GET to /programs/:programId/teams/:teamId

    const router = require('express').Router();
    const db = require('../models')
    
    
    // index experimentalDirectory route - ✅
    
    
    router.get('/:programId/:teamId/:exDirId', (req,res)=>{
        db.ExperimentDirectory.findById(req.params.exDirId, (err, foundExDir)=>{
            console.log('hello from index of experimentalDirectory route')
             if (err) return console.log(err)
            
            console.log(foundExDir.experiments)
            res.json(foundExDir)
            
        })
       
    })
    
    // show experiment route  ✅
    
    router.get('/:programId/:teamId/:exDirId/:experimentId', (req,res) =>{
        //look thought Program object to get the id, then find teams in that
        db.ExperimentDirectory.findById(req.params.exDirId, (err, foundExDir)=> {
            if (err) return console.log(err)
            console.log('found' + foundExDir.experiments)
            //return those found exdirs ina  new array, this is not essential but cleans up the code a little
            console.log(foundExDir, ' FOUND ExDir ')
            const experimentArray = [...foundExDir.experiments]
            console.log('programs array log' , experimentArray)
            console.log(req.params.experimentId)
            //this searches the team array for the team with the same id as in the url and stores it as a variable
            
            const foundExperiment = experimentArray.find((experiment)=>{
            // note the == here, the team._id is a string but req.params.articleId is acutally a differnt datatype called an object ID, strict equality will match datatypes and fail, so use the double equals
            return experiment._id == req.params.experimentId
             
            })
            console.log(foundExperiment)
            //now we render out that found exDir on the page, 
            res.json(foundExperiment)
            
        })
    
    })

    //Post Route ✅
    
    router.post('/:programId/:teamId/:exDirId', (req,res)=>{
        db.Experiment.create(req.body,(err, newExperiment)=>{
            console.log('created experiment')
            if (err) return console.log(err)
            db.ExperimentDirectory.findByIdAndUpdate(
                req.params.exDirId, { $push: {experiments: newExperiment}}, (err, updatedExperiments) =>{
                    if (err) return console.log(err)
                    res.json(updatedExperiments)
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
    router.delete('/:programId/:teamId/:exDirId/:experimentId',(req,res)=>{
        //go low to high, delete from the articles db first, then pass the article that was deleted to the city db. 
        db.Experiment.findByIdAndDelete(req.params.experimentId, (err, deletedExperiment) => {
            if (err) return console.log(err);
            db.ExperimentDirectory.findByIdAndUpdate(
                req.params.exDirId,
                { $pull: {experiments:deletedExperiment}},
                {new: true}, // do you want the version with or without changes?, you want the City with the article deleted, therefore new:true. 
                (err, updatedExDir) => {
                    if (err) return console.log(err)
                    res.json(updatedExDir)
                }
            )
          });
    })
    
    module.exports = router