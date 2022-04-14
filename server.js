// packages
const express = require('express');
const fs = require("fs");
const notes = require("./db/db/db.json")
const path = require('path');
const uuid = require("uuid");
const app = express();

// Port
const PORT = process.env.PORT || 3001;


// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// app.use(express.static(__dirname + '/public'));

// route for index.html
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);


// route for notes.html
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
   
);

// app.get("/api/notes", (req, res) => {
// res.sendFile(path.join(__dirname, "./db/db/db.json"))
// });

// api route to retrieve notes saved
app.get('/api/notes', (req, res) => {
res.sendFile(path.join(__dirname, "./db/db/db.json"))
});

app.post('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db/db.json'));
    const newNotes = req.body;
    newNotes.id = uuid.v4();
    notes.push(newNotes);
    fs.writeFileSync("./db/db/db.json", JSON.stringify(notes))
    res.json(notes);
});

    
    // 'utf8', (err, data) => {
    //     if (err) throw err;
    //     var notes = JSON.parse(data);

    //     var newNote = req.body;
    //     newNote.id = uuid.v4();
    //     console.log(newNote)

    //     var allNotes = [...notes, newNote]
    //     fs.writeFile('db/db.json', JSON.stringify(allNotes), err => {
    //         if (err) throw err;
    //         return true;
    //     })
    //     fs.readFile('/db/db.json', 'utf8', (err, data) => {
    //         if (err) throw err;
    //         var notes = JSON.parse(data);
    //         res.json(notes);
//         });
//     });
// })



app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);