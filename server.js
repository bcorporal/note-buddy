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

