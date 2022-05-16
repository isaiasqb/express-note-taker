// SERVER WILL USE THIS FILE TO RUN FROM

//import express furnctionality
const express = require('express');
//import the data from the notes.json file
const { notes }  = require('./data/notes.json')

//SERVER declaration
const app = express();

// environment variable, use heroku port or another port
const PORT = process.env.PORT || 3001


function filterByQuery(query, notesArray) {
  let soughtNote = notesArray;
  if (query.title) {
    soughtNote = soughtNote.filter(notes => notes.title === query.title);
  }
  return filteredResults;
}


// declare route to request the all notes data
app.get('/api/notes', (req, res) =>{
  res.send(notes);
})

// declare route to request a particular notes
app.get('/api/notes', (req, res) =>{
  let thisNote = notes;
  if(req.query) {
    thisNote = filterByQuery(req.query, thisNote);
  }
  res.json(thisNote);
})



//chain the server to the LISTEN() method and listen for requests
app.listen(PORT, () => {
  console.log(`Server is listening for NOTES`)
});
