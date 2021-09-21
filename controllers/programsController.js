const router = require('express').Router();
const db = require('../models');

// BASE ROUTE - /api/programs

// actual route - GET /api/programs
//return dat for all programs

router.get('/', (req, res) => {
   db.Program.find({}, (err, foundPrograms) => {
    if (err) return console.log(err);
    
    res.json(foundPrograms);
  });
});
// actual route - GET /api/programs/:id
router.get('/:id', (req, res) => {
   db.Program.findById(req.params.id, (err, foundProgram) => {
    if (err) return console.log(err);

    
    res.json(foundProgram);
    console.log( foundProgram)
  });
});


// actual route - POST /api/games
router.post('/', (req, res) => {
  db.Program.create(req.body, (err, savedProgram) => {
    if (err) return console.log(err);
    
    res.json(savedProgram);
  });
});


// actual route - PUT /api/games/:id
router.put('/:id', (req, res) => {

  db.Program.findByIdAndUpdate(
    req.params.id, // finds the Program with id passed in from URL
    req.body, // passes in data to update a program from the req.body
    {new: true}, // We want to updated program returned in the callback
    (err, updatedProgram) => { // function called after update completes
      if (err) return console.log(err);
      
      res.json(updatedProgram);
    });
});


// actual route - DELETE /api/games/:id
router.delete('/:id', (req, res) => {
  db.Program.findByIdAndDelete(req.params.id, (err, deletedProgram) => {
    if (err) return console.log(err);

    res.json({ messaage:'Successful deletion' });
  });
});


module.exports = router;
