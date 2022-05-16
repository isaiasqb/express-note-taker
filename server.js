// SERVER WILL USE THIS FILE TO RUN FROM

//import express furnctionality
const express = require('express');
//import the data from the notes.json file
const { notes }  = require('./data/notes.json')

//SERVER declaration
const app = express();


//MIDDLEWARE FUNCTIONS
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// environment variable, use heroku port or another port
const PORT = process.env.PORT || 3001




// declare the functiion being used in the GET route by id
function findById(id, notesArray) {
  const thisNote = notesArray.filter(note => note.id === id)[0];
  return thisNote;
}

// declare function to create a new note
function createNote(body, notesArray){
  //create aunique id for every note
  req.body.id = notes.length.toString();
  res.json(req.body)
}

// declare route to request the all notes data
app.get('/api/notes', (req, res) =>{
  res.send(notes);
})

// declare route to request a single note by param
app.get('/api/notes/:id', (req, res) =>{
  const singleNote = findById(req.params.id, notes);
  if(singleNote){
    res.json(singleNote)
  } else {
    res.send(404);
  };
})


//route to POST/CREATE a new note
app.post('/api/notes', (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

//chain the server to the LISTEN() method and listen for requests
app.listen(PORT, () => {
  console.log(`Server is listening for NOTES on ${PORT}`)
});
