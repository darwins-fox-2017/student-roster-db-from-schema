"use strict"
//write your code here
const repl = require("repl")
const sqlite3 = require("sqlite3").verbose()

let file = "student.db"
let db = new sqlite3.Database(file)

let CREATE_TABLE = "CREATE TABLE IF NOT EXISTS students ( id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE)"
let SEED_DATA = "INSERT INTO students (firstname, lastname, birthdate) VALUES ('Adam', 'Saparudin', '1995-07-23'), ('Gasir', 'Buntut', '1995-06-01');"


let createTable = () => {
  //db.serialize to make sure command run syncronous
  db.serialize( () => {
    db.run(CREATE_TABLE, (err) => {
      if(err) {
        console.log(err)
      } else {
        console.log('CREATE TABLE')
      }
    })
  })
}

let seedData = () => {
  //db.serialize to make sure command run syncronous
  db.serialize( () => {
    db.run(SEED_DATA, (err) => {
      if(err) {
        console.log(err)
      } else {
        console.log('Data has been seeded')
      }
    })
  })
}

let r = repl.start('> ')
r.context.createTable = createTable;
r.context.seedData = seedData;
