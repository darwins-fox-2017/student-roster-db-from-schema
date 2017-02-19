"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
// write your code here

var file = 'student.db'
var db = new sqlite.Database(file);

class Student {
  constructor(firstname, lastname, birthdate){
    this.firstname = firstname
    this.lastname = lastname
    this.birthdate = birthdate
  }

  add(firstName, lastName, birthDate){
     let create = `INSERT INTO student (firstname, lastname , birthdate) VALUES ('${firstName}', '${lastName}', '${birthDate}');`
     db.serialize(function(){
       db.run(create, function(err){
         if(err) { console.log(err) } else { console.log('DATA ADDED') }
       })
     })
   }

   update(firstName, lastName, birthDate, id  ){
      let update = `UPDATE student SET firstName = '${firstName}', lastName = '${lastName}', birthDate = '${birthDate}' WHERE id = '${id}';`
      db.serialize(function(){
        db.run(update, function(err){
          if(err) { console.log(err) } else { console.log('DATA UPDATED') }
        })
      })
    }

  delete(id){
    let remove = `DELETE FROM student WHERE id = '${id}'`
    db.serialize(function(){
      db.run(remove, function(err){
        if(err) { console.log(err) } else {console.log('DATA DELETED');}
      })
    })
  }

  view(){
    let select = `SELECT * FROM student;`
    db.serialize(function(){
      db.each(select, function(err, row){
        if(err) { console.log(err) } else {console.log(row);}
      })
    })
  }

  findByName(name){
    let byName = `SELECT * FROM student WHERE firstName = '${name}' OR lastName = '${name}';`
    db.serialize(function(){
      db.each(byName, function(err, row){
        if(err) { console.log(err) } else { console.log(row);}
      })
    })
  }

  findByAttribute(collum, value){
    let byAttribute = `SELECT * FROM student WHERE ${collum} LIKE '${value}';`
    db.serialize(function(){
      db.each(byAttribute, function(err,row){
        if(err) { console.log(err) } else { console.log(row);}
      })
    })
  }

  findBirthdateThisMonth(){
    let ThisMotnth = `SELECT * FROM student WHERE STRFTIME('%m', birthDate) = STRFTIME('%m', 'now')`
    db.serialize(function(){
      db.each(ThisMotnth, function(err,row){
        if(err) { console.log(err) } else { console.log(row);}
      })
    })
  }

  sortBirthdate(){
    let birthdateSort = `SELECT * FROM student ORDER BY STRFTIME('%m', birthDate)`
    db.serialize(function(){
      db.each(sortBirthdate, function(err,row){
        if(err) { console.log(err) } else { console.log(row);}
      })
    })
  }

    help(){
    console.log(`
                        --------this apps menu--------
      start.context.add = student.add
      start.context.update = student.update
      start.context.delete = student.delete
      start.context.view = student.view
      start.context.findByName = student.findByName
      start.context.findByAttribute = student.findByAttribute
      start.context.findBirthdateThisMonth = student.findBirthdateThisMonth
      start.context.sortBirthdate = student.sortBirthdate
      ---------------------------------------------------------------------
      `);
  }

}

let student = new Student()
let start = repl.start('> ');

start.context.add = student.add
start.context.update = student.update
start.context.delete = student.delete
start.context.view = student.view
start.context.findByName = student.findByName
start.context.findByAttribute = student.findByAttribute
start.context.findBirthdateThisMonth = student.findBirthdateThisMonth
start.context.sortBirthdate = student.sortBirthdate
start.context.help = student.help
