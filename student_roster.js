"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

const file = 'student.db'
let db = new sqlite.Database(file)

class Student {
  constructor(firstName, lastName, birthDate) {
    this.firstName = firstName
    this.lastName  = lastName
    this.birthDate = birthDate
  }

  addStudent(firstName, lastName, birthDate){
    let seedData = `INSERT INTO student (firstname, lastname , birthDate) VALUES ('${firstName}', '${lastName}', '${birthDate}');`
    db.serialize(function(){
      db.run(seedData, function(err){
        err ? console.log(err):console.log(`INSERT DATA SUCCESSFUL`)
      })
    })
  }

  updateStudent(firstName, lastName, birthDate, id){
    let editData = `UPDATE student SET firstName = '${firstName}', lastName = '${lastName}', birthDate = '${birthDate}' WHERE id = '${id}'`
    db.serialize(function(){
      db.run(editData, function(err){
        err ? console.log(err):console.log(`UPDATE DATA SUCCESSFUL`);
      })
    })
  }

  deleteStudent(id){
    let removeData = `DELETE FROM student WHERE id = '${id}'`
    db.serialize(function(){
      db.run(removeData, function(err){
        err ? console.log(err):console.log(`DELETE DATA SUCCESSFUL`)
      })
    })
  }

  showStudent(){
    let showData = `SELECT * FROM student`
    db.serialize(function() {
      db.each(showData, function(err, row){
        err ? console.log(err):console.log(`\nID : ${row.id}\nName : ${row.firstName} ${row.lastName}\nBirthdate : ${row.birthDate}`);
      })
    })
  }

  findByName(name){
    let sortByName = `SELECT * FROM student WHERE firstName = '${name}' OR lastName = '${name}'`
    db.serialize(function(){
      db.each(sortByName, function(err, row) {
        err ? console.log(err):console.log(`ID : ${row.id}\nName : ${row.firstName} ${row.lastName}\nBirthdate : ${row.birthDate}`);
      })
    })
  }

  findByAttribute(field, value){
    let sortByField = `SELECT * FROM student WHERE ${field} LIKE '${value}'`
    db.serialize(function(){
      db.each(sortByField, function(err, row){
        err ? console.log(err):console.log(row);
      })
    })
  }

  getBirthdateByThisMonth(){
    let birthdateThisMonth = `SELECT * FROM student WHERE STRFTIME('%m', birthDate) = STRFTIME('%m', 'now')`
    db.serialize(function(){
      db.each(birthdateThisMonth, function(err, row){
        err ? console.log(err):console.log(row);
      })
    })
  }

  sortBirthdate(){
    let sortBirthdateStudents = `SELECT * FROM student ORDER BY STRFTIME('%m', birthDate)`
    db.serialize(function() {
      db.each(sortBirthdateStudents, function(err, row){
        err ? console.log(err):console.log(row);
      })
    })
  }

  Help(){
    console.log('ADD NEW STUDENT......................: addStudent(\'firstname\', \'lastname\', \'birthdate YYYY-MM-DD\')');
    console.log('SHOW ALL STUDENTS....................: showStudent()');
    console.log('FIND STUDENT BY NAME (FIRST OR LAST).: findByName()');
    console.log('FIND STUDENT BY ATTRIBUTE............: findByAttribute(\'fields\',\'value\')');
    console.log('REMOVE STUDENT.......................: deleteStudent(id)  ');
    console.log('UPDATE STUDENT\'s DETAIL..............: updateStudent(\'firstname\', \'lastname\', \'birthdate YYYY-MM-DD\', \'id\')  ');
    console.log('GET BIRTHDAY BY THIS MONTH...........: birthdateThisMonth() ')
    console.log('SORT BIRTHDAY BY MONTH...............: sortBirthdate()');
  }

}

let student = new Student()
let start = repl.start('> ');

start.context.help = student.Help
start.context.addStudent = student.addStudent
start.context.updateStudent = student.updateStudent
start.context.deleteStudent = student.deleteStudent
start.context.showStudent = student.showStudent
start.context.findName = student.findByName
start.context.findAttribute = student.findByAttribute
start.context.birthdateThisMonth = student.getBirthdateByThisMonth
start.context.sortBirthdate = student.sortBirthdate
