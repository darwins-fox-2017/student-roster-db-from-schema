"use strict"

const repl   = require('repl');
const sqlite = require('sqlite3').verbose();

// write your code here
var file = 'student.db'
var db   = new sqlite.Database(file)

var CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student ( id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE)"
var SEED_DATA = "INSERT INTO student (firstname, lastname, birthdate) VALUES ('Rubi', 'Henjaya', '1986-11-20'), ('Riza', 'Fahmi', '1983-12-31')"

let createTable = () => {
  db.serialize(() => {
    db.run(CREATE_TABLE, err => {
      if (err) {
        console.log(err)
      } else {
        console.log('CREATE_TABLE')
      }
    })
  })
}

let seedData = () => {
  db.serialize(() => {
    db.run(SEED_DATA, err => {
      if (err) {
        console.log(err)
      } else {
        console.log('SEED_DATA')
      }
    })
  })
}

let input = repl.start('Command here: ')
input.context.create_table = createTable
input.context.seed_data    = seedData
