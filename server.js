// SERVER WILL USE THIS FILE TO RUN FROM

//import express furnctionality
const express = require('express');
//import the data from the notes.json file
const { notes }  = require('./data/notes.json')
//import the file system functionality
const fs = require('fs');
const path = require('path');

//SERVER declaration
const app = express();


//MIDDLEWARE FUNCTIONS
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//make files forn the fornt  end  available
app.use(express.static('public'));

// environment variable, use heroku port or another port
const PORT = process.env.PORT || 3001




// FUNCTION being used in the GET route by id
function findById(id, notesArray) {
  const thisNote = notesArray.filter(note => note.id === id)[0];
  return thisNote;
}

// FUNCTION to CREATING a new note and add it to json file
function createNote(body, notesArray){
  const newNote = body;
  notesArray.push(newNote);
  // use fs to rewite the json file for notes
  fs.writeFileSync(
    path.join(__dirname, './data/notes.json'),
    JSON.stringify({notes: notesArray}, null, 2)
  );

  return newNote;
}

//FUNCTION for DELETING a note
// FUNCTION to create a new note and add it to json file
function deleteNote(body, notesArray){

}



// GET all notes data - Route
app.get('/api/notes', (req, res) =>{
  res.send(notes);
})

// GET a single note by param - Route
app.get('/api/notes/:id', (req, res) =>{
  const singleNote = findById(req.params.id, notes);
  if(singleNote){
    res.json(singleNote)
  } else {
    res.send(404);
  };
})


// POST/CREATE a new note - Route
app.post('/api/notes', (req, res) => {
  //create aunique id for every note, and error prevention if there are no  notes
  let newId = 1 + parseInt(notes[notes.length - 1].id);
  if(!notes.length){
    newId = 0
  }
  req.body.id = newId.toString()
  
  // prevent empty string to be submitted as null
  if(!req.body.title){
    req.body.title = "New Note"
  }
  if(!req.body.text){
    req.body.text = ""
  }

  //add the note to json file and notesArray
  const newNote = createNote(req.body, notes);
  res.json(newNote);
});

// DELETE a note - Route
app.delete('/api/notes/:id', (req, res) => {
  const unwantedNote = findById(req.params.id, notes);
  if(unwantedNote){
    res.json(unwantedNote)
  } else {
    res.send(404);
  };
});


// Route for index.html to be served from our Express.js
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});



//chain the server to the LISTEN() method and listen for requests
app.listen(PORT, () => {
  console.log(`Server is listening for NOTES on ${PORT}`)
});
