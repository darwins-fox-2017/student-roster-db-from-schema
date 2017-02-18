"use strict"

const repl    = require('repl');
const sqlite  = require('sqlite3').verbose();

var file      = 'student.db';
var db        = new sqlite.Database(file);

//SQL statement

var CREATE_TABLE  = "CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE)";
var SEED_DATA     = "INSERT INTO students (firstname, lastname, birthdate) VALUES ('Isumi', 'Karina', '1989-02-07'), ('Aiko', 'Diandra', '1989-01-01');";

//CREATE_TABLE

let createTable = () => {
  db.serialize(function(){
    db.run(CREATE_TABLE, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log('SUCCESS CREATE TABLE');
      }
    });
  });
}

//SEED_DATA
let seedData = () => {
  db.serialize(function() {
    db.run(SEED_DATA, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log('SUCCESS SEED DATA');
      }
    });
  });
}

let relp = repl.start("> ")
relp.context.createTable  = createTable
relp.context.seedData     = seedData
