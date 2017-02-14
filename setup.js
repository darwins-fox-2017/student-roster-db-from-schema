"use strict"

const repl=require('repl');
const sqlite3 = require('sqlite3').verbose();
let file = 'student.db';
var db = new sqlite3.Database(file);

var CREATE_TABEL = "CREATE TABLE IF NOT EXISTS student(id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT NOT NULL ,birthdate DATE)"
var INSERT_TABEL = "INSERT INTO student (first_name,last_name,birthdate) VALUES ('Rubi','Hendrajaya','1986-11-20'),('Riza', 'Fahmi', '1983-12-3')";

let createtabel=()=>{
  db.serialize(function(){
    db.run(CREATE_TABEL,function(err){
      if (err) {
        console.log(err);
      } else {
        console.log('tabel created');
      }
    })
  });

};

let inserttabel =() =>{
  db.serialize(function(){
    db.run(INSERT_TABEL,function(err){
      if (err) {
        console.log(err);
      } else {
        console.log('tabel inserted');
      }
    })
  });

}

let r=repl.start('=> ');
r.context.createtabel=createtabel;
r.context.inserttabel=inserttabel;
