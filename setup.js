"use strict"
// setup
let repl = require('repl');
let sqlite3 = require('sqlite3').verbose();
let file = 'student.db';
let db = new sqlite3.Database(file);

// query
let CREATE_TABLE = "CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE)";
let SEED_DATA = "INSERT INTO student (firstname, lastname, birthdate) VALUES ('Rubi', 'Henjaya', '1986-11-20'), ('Riza', 'Fahmi', '1983-12-31');"

// function untuk membuat table
let createTable = () => {
  db.serialize(function() {
    db.run(CREATE_TABLE, function(err) {
      (err) ? console.log(err) : console.log('table berhasil dibuat');
    });
  });
};

// function untuk memasukkan data ke dalam table
let seedData = () => {
  db.serialize(function() {
    db.run(SEED_DATA, function(err) {
      (err) ? console.log(err) : console.log('data berhasil dimasukkan');
    });
  });
}

// perintah repl
let replStr = repl.start('> ');
replStr.context.buatTable = createTable;
replStr.context.isiData = seedData;
