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

// declare function to create a new note and add it to json file
function createNote(body, notesArray){
  const newNote = body;
  notesArray.push(newNote);
 
  return newNote;
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
  //create aunique id for every note, and error prevention if there are no  notes
  let newId = 1 + parseInt(notes[notes.length - 1].id);
  if(!notes.length){
    newId = 0
  }
  req.body.id = newId.toString()

  //add the note to json file and notesArray
  const newNote = createNote(req.body, notes);

  res.json(req.body);
});

//chain the server to the LISTEN() method and listen for requests
app.listen(PORT, () => {
  console.log(`Server is listening for NOTES on ${PORT}`)
});
