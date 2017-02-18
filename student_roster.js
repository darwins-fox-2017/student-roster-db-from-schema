"use strict"

const repl    = require('repl');
const sqlite  = require('sqlite3').verbose();
const file    = 'student.db';
const db      = new sqlite.Database(file);

class Student{
  constructor(firstname, lastname, birthdate){
    this.firstname  = firstname
    this.lastname   = lastname
    this.birthdate  = birthdate
  }

  addStudent(firstname, lastname, birthdate){
    let QUERY = `INSERT INTO students (firstname, lastname, birthdate) VALUES ('${firstname}','${lastname}','${birthdate}');`
    db.serialize(function() {
      db.run(QUERY, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log(`SUCCESS INSERT DATA STUDENT!\nFirst Name : ${firstname}\nLast Name : ${lastname}\nBirth Date : ${birthdate} `);
        }
      });
    });
  }

  deleteStudent(id){
    let QUERY = `DELETE FROM students WHERE id = ${id};`
    db.serialize(function() {
      db.run(QUERY, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log(`SUCCESS DELETE DATA STUDENT!\nID : ${id}`);
        }
      });
    });
  }

  updateStudent(firstname, lastname, birthdate, id){
    let QUERY = `UPDATE students SET firstname = '${firstname}' , lastname = '${lastname}', birthdate = '${birthdate}' WHERE id = ${id};`
    db.serialize(function() {
      db.run(QUERY, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log(`SUCCESS UPDATE DATA STUDENT!\nFirst Name : ${firstname}\nLast Name : ${lastname}\nBirth Date : ${birthdate} `);
        }
      });
    });
  }

  showStudent(){
    let QUERY = "SELECT * FROM students;"
    db.serialize(function() {
      db.all(QUERY, function(err,rows) {
          if(err) {
            console.log(err);
          } else {
            console.log(`\t\tTABLE STUDENT\n____________________________________________________\n`);
            console.log("|ID|\t|First Name|\t|Last Name|\t|Birth Date|");
              for(let i = 0;i < rows.length;i++){
                console.log(" "+rows[i].id+"\t "+rows[i].firstname+"\t\t "+rows[i].lastname+"\t\t "+rows[i].birthdate);
              }
          }
      });
    });
  }

  showSpecific(firstname, lastname){
    let QUERY = `SELECT id, firstname, lastname FROM students WHERE firstname LIKE '%${firstname}%' OR lastname LIKE '%${lastname}%';`
    db.serialize(function() {
      db.all(QUERY, function(err,rows) {
        if(err) {
          console.log(err);
        } else {
          console.log(`\t\tTABLE STUDENT\n____________________________________________________\n`);
          console.log("|ID|\t|First Name|\t|Last Name|");
            for(let i = 0;i < rows.length;i++){
              console.log(" "+rows[i].id+"\t "+rows[i].firstname+"\t\t "+rows[i].lastname);
            }
        }
      });
    });
  }

  showAttribute(field, value){
    let QUERY = `SELECT * FROM students WHERE ${field} LIKE '${value}';`
    console.log(QUERY);
    db.serialize(function() {
      db.all(QUERY, function(err,rows) {
        if(err) {
          console.log(err);
        } else {
          console.log(`\t\tTABLE STUDENT\n____________________________________________________\n`);
          console.log(value.toUpperCase()+"\n");
            for(let i = 0;i < rows.length;i++){
              console.log((i+1)+".  "+JSON.stringify(rows[i])+"\n");
            }
        }
      });
    });
  }

  searchByMonth(){
    let QUERY = "SELECT id, firstname,lastname, birthdate FROM students WHERE strftime('%m', birthdate) = strftime('%m','now');"
    db.serialize(function() {
      db.all(QUERY,function(err,rows) {
        if(err) {
          console.log(err);
        } else {
          console.log(`\t\tTABLE STUDENT\n____________________________________________________\n`);
          console.log("|ID|\t|First Name|\t|Last Name|\t|Birth Date|");
            for(let i = 0;i < rows.length;i++){
              console.log(" "+rows[i].id+"\t "+rows[i].firstname+"\t\t "+rows[i].lastname+"\t\t "+rows[i].birthdate);
            }
        }
      });
    });
  }

  searchByDate(){
    let QUERY = "SELECT id, firstname, lastname ,strftime('%d-%m', birthdate) AS bd FROM students ORDER BY strftime('%m', birthdate) ASC, strftime('%d', birthdate) ASC;"
    db.serialize(function() {
      db.all(QUERY,function(err,rows) {
        if(err) {
          console.log(err);
        } else {
          console.log(`\t\tTABLE STUDENT\n____________________________________________________\n`);
          console.log("|ID|\t|First Name|\t|Last Name|\t|Birth Date|");
          for(let i = 0;i < rows.length;i++){
            console.log(" "+rows[i].id+"\t "+rows[i].firstname+"\t\t "+rows[i].lastname+"\t\t "+rows[i].bd);
          }
        }
      });
    });
  }

  help(){
      console.log("::   MENU   :: \n");
      console.log("1. addStudent('firstname','lastname','birthdate: YYYY-MM-DD')\n2. updateStudent('firstname','lastname','birthdate: YYYY-MM-DD', 'id')\n3. deleteStudent(id)\n4. showStudent()\n5. showAttribute('firstname/lastname/birthdate', 'value')\n6. showSpesific(firstname,lastname)\n7. searchByMonth()\n8. searchByDate()\n");
  }
}

let data = new Student()
let relp = repl.start("> ")
relp.context.addStudent     = data.addStudent
relp.context.updateStudent  = data.updateStudent
relp.context.deleteStudent  = data.deleteStudent
relp.context.showStudent    = data.showStudent
relp.context.showAttribute  = data.showAttribute
relp.context.showSpecific   = data.showSpecific
relp.context.searchByMonth  = data.searchByMonth
relp.context.searchByDate   = data.searchByDate
relp.context.help           = data.help

//running: node student_roster.js
/*
help()
showStudent()
addStudent('Isumi', 'Karina', '1989-02-01')
updateStudent('Isumi', 'Karina N.', '1989-02-07')
deleteStudent()
showAttribute('firstname', 'Isumi')
showSpecific('Isumi', 'Karina')
searchByMonth()
searchByDate()
*/
