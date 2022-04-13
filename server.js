// packages
const express = require('express');
const path = require('path');
const fs = require("fs");
const path = require("path");


const notes = require("./db/db.json");

// Port
var PORT = process.env.PORT || 3001;
const app = express();


// route to retrieve notes saved
app.get('/api/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/db/db.json'))
);


// route for notes.html
app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// route for index.html
app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

// new note
app.post('/api/notes', (req,res) => {
    let newNote = req.body;
    notes.push(newNote);
    // adds id number to each note
    let num = 1
    notes.forEach((note) => {
        note.id = num;
        num++;
        return notes;
    })
    fs.writeFileSync('./db/db.json', JSON.stringify(notes))
    res.json(newNote);
   

})


app.use(express.json());
app.use(express.urlencoded({ extended:  true}));
app.use(express.static('public'));





app.listen(PORT, function() {
    console.log('App listening on PORT: ' + PORT);
  });


// GIVEN a note-taking application
// WHEN I open the Note Taker
// THEN I am presented with a landing page with a link to a notes page
// WHEN I click on the link to the notes page
// THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
// WHEN I enter a new note title and the note’s text
// THEN a Save icon appears in the navigation at the top of the page
// WHEN I click on the Save icon
// THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
// WHEN I click on an existing note in the list in the left-hand column
// THEN that note appears in the right-hand column
// WHEN I click on the Write icon in the navigation at the top of the page
// THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column

// On the back end, the application should include a `db.json` file that will be used to store and retrieve notes using the `fs` module.

// The following HTML routes should be created:

// * `GET /notes` should return the `notes.html` file.

// * `GET *` should return the `index.html` file.

// The following API routes should be created:

// * `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.

// * `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
