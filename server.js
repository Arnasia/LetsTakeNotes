//requires and express data parsing
const fs = require ('fs');
const express = require ("express");
const path = require("path")
const app = express();
const PORT = process.env.PORT || 3001;

//generate random id
const uuid = require('uuid')

const { notes } = require ("./db/db")

//parses incoming JSON data
app.use(express.urlencoded({extended: true}));
//parses incoming array data
app.use(express.json());
//make the files static
app.use(express.static('public'));


//write a new note
function takeNote (body, notesArray) {
    const note = body
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
};

//Routes

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  req.body.id = uuid.v4();
  const note = takeNote(req.body, notes);
  res.json(note);
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

 //delete notes 
 app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
  
    const removeNote = notes.findIndex(note => note.id ==id);
  
    notes.splice(removeNote, 1);
    return res.send();
  });

  //app listerner
  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
