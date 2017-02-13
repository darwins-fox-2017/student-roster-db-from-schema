"use strict"
const repl = require('repl');
const sqlite = require('sqlite3').verbose();
let Table = require('cli-table');


var file = 'student.db'
var db = new sqlite.Database(file)

class Student{
  constructor(){

  }

  addStudent(firstname,lastname,birthdate){


    let ADD_STUDENT = `INSERT INTO  students (firstname, lastname, birthdate) VALUES ("${firstname}","${lastname}","${birthdate}");`

    db.serialize(function(){

      db.run(ADD_STUDENT,function(err){
        if(err){
          console.log(err);
        }else{
          console.log('Add data success');
        }
      })
    })
  }

  updateTable(id,firstname,lastname,birthdate){

    let UPDATE_TABLE = `UPDATE students SET firstname = "${firstname}", lastname = "${lastname}", birthdate = "${birthdate}" WHERE id = ${id};`

    db.serialize(function(){

      db.run(UPDATE_TABLE,function(err){
        if(err){
          console.log(err);
        }else{
          console.log('Update table success');
        }
      })
    })
  }

  deleteStudent(id){

    let DELETE_STUDENT = `DELETE FROM students WHERE id = ${id};`

    db.serialize(function(){

      db.run(DELETE_STUDENT,function(err){
        if(err){
          console.log(err);
        }else{
          console.log('Delete data success');
        }
      })
    })
  }

  showAll(){

    let SHOW_ALL = `SELECT * FROM students`
    let table = new Table({
    head: ['ID', 'first name', 'lastname' ,'birthdate'],
    colWidths: [5,15,15,15]
    });

    db.serialize(function(){
      db.all(SHOW_ALL,function(err,row){
        if(err){
          console.log(err);
        }else{
          for (let i = 0; i < row.length; i++) {
            table.push(
            [`${row[i].id}`,`${row[i].firstname}`,`${row[i].lastname}`, `${row[i].birthdate}`]
            )
          }
          console.log('\n'+table.toString())
        }
      })
    })
  }

  showByName(name){

    let SHOW_BY_NAME = `SELECT * FROM students WHERE firstname = "${name} OR lastname = "${name}";`
    let table = new Table({
    head: ['ID', 'first name', 'lastname' ,'birthdate'],
    colWidths: [5,15,15,15]
    });
    db.serialize(function(){

      db.all(SHOW_BY_NAME,function(err,row){
        for (let i = 0; i < row.length; i++) {
          table.push(
          [`${row[i].id}`,`${row[i].firstname}`,`${row[i].lastname}`, `${row[i].birthdate}`]
          )
        }
        console.log('\n'+table.toString())

      })
    })

  }

  showByAttr(typeName, name){

    let SHOW_BY_ATTR = `SELECT * FROM students WHERE ${typeName} = "${name}";`
    let table = new Table({
    head: ['ID', 'first name', 'lastname' ,'birthdate'],
    colWidths: [5,15,15,15]
    });
    db.serialize(function(){


      db.all(SHOW_BY_ATTR,function(err,row){
        if(err){
          console.log(err);
        }else{
          for (let i = 0; i < row.length; i++) {
            table.push(
            [`${row[i].id}`,`${row[i].firstname}`,`${row[i].lastname}`, `${row[i].birthdate}`]
            )
          }
          console.log('\n'+table.toString())
        }
      })
    })

  }

  birthdayThisMonth(){

    let BIRTHDAY_THIS_MONTH = `SELECT * FROM students WHERE strftime('%m', birthdate) =  strftime('%m', 'now');`
    let table = new Table({
    head: ['ID', 'first name', 'lastname' ,'birthdate'],
    colWidths: [5,15,15,15]
    });

    db.serialize(function(){

      db.all(BIRTHDAY_THIS_MONTH,function(err,row){
        if(err){
          console.log(err);
        }else{
          for (let i = 0; i < row.length; i++) {
            table.push(
            [`${row[i].id}`,`${row[i].firstname}`,`${row[i].lastname}`, `${row[i].birthdate}`]
            )
          }
          console.log('\n'+table.toString())
        }
      })
    })

  }

  birthdaySortByMonth(){

    let BIRTHDAY_SORT = `SELECT * FROM students ORDER BY strftime('%m', birthdate);`
    let table = new Table({
    head: ['ID', 'first name', 'lastname' ,'birthdate'],
    colWidths: [5,15,15,15]
    });

    db.serialize(function(){

      db.all(BIRTHDAY_SORT,function(err,row){
        if(err){
          console.log(err);
        }else{
          for (let i = 0; i < row.length; i++) {
            table.push(
            [`${row[i].id}`,`${row[i].firstname}`,`${row[i].lastname}`, `${row[i].birthdate}`]
            )
          }
          console.log('\n'+table.toString())
        }
      })
    })

  }

  help(){
    let table = new Table({
    head: ['Command', 'Details'],
    colWidths: [10,60],
     style: { 'padding-left': 0, 'padding-right': 0 }
    });

    table.push(
    ["HELP","help()"],
    ["ADD NEW STUDENT","addStudent(\"firstname\",\"lastname\",\"birthdate YY-MM-DD\")"],
    ["SHOW ALL STUDENT","showAll()"],
    ["FIND STUDENT BY NAME (FIRST/LAST)","showByName(\"name\")"],
    ["FIND STUDENT BY ATTRIBUTE","showByAttr(\"attribute\",\"attr_field\")"],
    ["REMOVE STUDENT","deleteStudent(id)"],
    ["UPDATE STUDENT DETAIL","updateTable(id,\"firstname\",\"lastname\",\"birthdate YY-MM-DD\")"],
    ["GET BIRTHDAY OF THIS MONTH","birthdayThisMonth()"],
    ["SORT BIRTHDAY BY MONTH","birthdaySortByMonth()"]

    )

    console.log('\n'+table.toString())
  }
}

let student = new Student()
let input = repl.start('> ')

input.context.addStudent = student.addStudent
input.context.updateTable = student.updateTable
input.context.deleteStudent = student.deleteStudent
input.context.showAll = student.showAll
input.context.showByName = student.showByName
input.context.showByAttr = student.showByAttr
input.context.birthdayThisMonth = student.birthdayThisMonth
input.context.birthdaySortByMonth = student.birthdaySortByMonth
input.context.help = student.help
