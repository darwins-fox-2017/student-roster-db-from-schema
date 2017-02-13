"use strict"
const repl = require ('repl')
const sqlite = require('sqlite3').verbose()

const file = 'student.db'
let db = new sqlite.Database(file)

//SQL STATEMENT
let CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT NOT NULL, lastName TEXT, birthDate DATE)";
let SEED_DATA    = "INSERT INTO student (firstName, lastName, birthDate) VALUES ('Eri','Irawan','1991-02-01'),('Jhon','Cater','1994-02-01'),('Dave','Cullen','2017-02-13')"

//CREATE TABEL
let createTable = () => {
  db.serialize(function() {
    db.run(CREATE_TABLE, function(err) {
      err ? console.log(err):console.log(`CREATE TABLE SUCCESSFUL`);
    })
  })
}

//SEED DATA
let seedData = () => {
  db.serialize(function(){
    db.run(SEED_DATA, function(err){
      err ? console.log(err):console.log(`SEED DATA SUCCESSFUL`);
    })
  })
}

let start = repl.start('> ')
    start.context.createTable = createTable
    start.context.seedData    = seedData
