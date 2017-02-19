"use strict"

const repl = require('repl')
const sqlite = require('sqlite3').verbose()

var file = 'student.db'
var db = new sqlite.Database(file)

// SQL Statement
var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE)"
var SEED_DATA = "INSERT INTO students(firstname, lastname, birthdate) VALUES ('Rubi', 'Henjaya', '1986-11-20'), ('Riza', 'Fahmi', '1983-12-31')"

// Create TABLE
let createTable = () => {
  // Run SQL one at a time
  db.serialize(function() {
    // Create TABLE
    db.run(CREATE_TABLE, function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log('CREATE_TABLE');
      }
    })
  })
}

// SEED_DATA
let seedData = () => {
  db.run(SEED_DATA, function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log(SEED_DATA)
    }
  })
}

var r = repl.start('> ')
r.context.createTable = createTable
r.context.seedData = seedData
