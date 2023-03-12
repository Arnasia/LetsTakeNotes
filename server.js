//requires and express data parsing
const fs = require ('fs');
const express = require ("express");
const path = require("path")
const app = express();
const uuid = require('uuid')

const PORT = process.env.PORT || 3001;

//parses incoming JSON data
app.use(express.urlencoded({extended: true}));

//parses incoming array data
app.use(express.json());

//make the files static
app.use(express.static('public'));


//write a new note
function takeNote (body) {
    const note = body;
    LetsTakeNotes.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ LetsTakeNotes }, null, 2)
    );
    return note;
};

//Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/LetsTakeNotes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });
  
  app.get('/api/LetsTakeNotes', (req, res) => {
    res.json(LetsTakeNotes);
  });

  app.post('/api/notes', (req, res) => {
    req.body.id = uuid();
    const note = takeNote(req.body, LetsTakeNotes);
    res.json(note);
  });

  

  


