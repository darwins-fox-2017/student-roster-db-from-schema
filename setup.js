"use strict"
const repl = require('repl')
const sqlite = require('sqlite3').verbose();
let file = 'student.db';
let db = new sqlite.Database(file);

//write your code here
let CREATE_TABLE = "CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE)"
let SEED_DATA = "INSERT INTO students (firstname,lastname,birthdate) VALUES ('Rubi','Henjaya','1986-11-20'), ('Riza','Fahmi','1983-12-31')"

//Buat table
let createTable = () =>{
  db.serialize(function () {
    db.run(CREATE_TABLE, function (err) {
      err?console.log(err) : console.log('CREATE TABLE');
    })
  })
}

//SEED DATA
let seetData = () =>{
  db.serialize(function(){
    db.run(SEED_DATA, function (err){
      err?console.log(err) : console.log('SEED DATA ');
    })
  })
}
let start = repl.start('> ')
start.context.seetData = seetData;
start.context.createTable = createTable;
