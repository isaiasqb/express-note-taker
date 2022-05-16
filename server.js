// SERVER WILL USE THIS FILE TO RUN FROM

const express = require('express');

//SERVER declaration
const app = express();


//chain the server to the LISTEN() method and listen for requests
app.listen(3001, () => {
  console.log(`Server is listening`)
});
