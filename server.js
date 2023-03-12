//requires and express data parsing
const fs = require ('fs');
const express = require ("express");
const path = require("path")
const app = express();

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
    
}


