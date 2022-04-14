// packages
const express = require('express');
const fs = require("fs");
const path = require('path');
const app = express();
const uuid = require('uuid');

// Port
const PORT = process.env.PORT || 3001;



// const notes = require("./Develop/db/db.json");
// const { Console } = require('console');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended:  true}));

app.use(express.static('public'));

// route for index.html
app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, './develop/public/index.html'))
);


// route for notes.html
app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, './develop/public/notes.html'))
);


// api route to retrieve notes saved
app.get('/api/notes', (req, res) =>
fs.readFile('/Develop/db/db.json', 'utf8', (err, data) =>{
    if(err) throw err;
    var notes = JSON.parse(data);
    res.json(notes);
}));

app.post('/api/notes', (req, res) => {
    fs.readFile('/Develop/db/db.json', 'utf8', (err, data) => {
        if(err) throw err;
        var notes = JSON.parse(data);

        var newNote = req.body;
        newNote.id = uuid.v4();
        console.log(newNote)
        
        var allNotes = [...notes, newNote]
        fs.writeFile('/Develop/db/db.json', JSON.stringify(allNotes), err =>{
            if(err) throw err;
            return true;
        })
    fs.readFile('/Develop/db/db.json', 'utf8', (err, data) =>{
        if(err) throw err;
        var notes = JSON.parse(data);
        res.json(notes);
    });
});
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);