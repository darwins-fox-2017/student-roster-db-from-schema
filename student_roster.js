"use strict"

const repl = require('repl')
const sqlite = require('sqlite3').verbose();
let file = 'student.db';
let db = new sqlite.Database(file);

// write your code here
class Student{
  static addStudent(firstname,lastname,birthdate){
    // let ADD_STUDENT = `INSERT INTO students (firstname,lastname,birthdate) VALUES (?, ?, ?)`
    // db.serialize(function(){
    //   db.run(ADD_STUDENT,[firstname,lastname,birthdate], function (err) {
    //     err? console.log(err):console.log('Add data berhasil!!');
    //   })
    // })

    let ADD_STUDENT = `INSERT INTO students (firstname,lastname,birthdate) VALUES ($firstname,$lastname,$birthdate)`
    db.serialize(function(){
      db.run(ADD_STUDENT,{
        $firstname: firstname,
        $lastname:lastname,
        $birthdate: birthdate
      }, function (err) {
        err? console.log(err):console.log('Add data berhasil!!');
      })
    })
  }
  static updateStudent(firtname, lastname, birthdate, id){
    let UPDATE_Student = `UPDATE students SET firstname ='${firtname}', lastname = '${lastname}', birthdate ='${birthdate}' WHERE id = ${id}`
    db.serialize(function(){
      db.run(UPDATE_Student, function(err){
        err ? console.log(err):console.log('UPDATE STUDENT');
        })
      })
    }
  static deleteStudent(id){
    let DELETE_STUDENT = `DELETE from students WHERE id = ${id}`
    db.serialize(function () {
      db.run(DELETE_STUDENT, function(err){
        err ? console.log(err) : console.log('Data sudah di hapus!!');
      })
    })
  }
  static showDataStudent(id){
    let SHOW_STUDENT = `SELECT * FROM students`
    db.serialize(function(){
      db.all(SHOW_STUDENT, function(err, data){
        err?console.log(err):console.log(data);
      })
    })
  }
  static nameStudent(stringName){
    let NAME_STUDENT = `SELECT * FROM students WHERE firstname LIKE '${stringName}' OR lastname LIKE '${stringName}'`
    db.serialize(function(){
      db.each(NAME_STUDENT, function(err, data){
        err?console.log(err):console.log(data);
        })
      })
    }
    static atributeStudent(namaKolom, value){
      let ATRIBUTE_STUDENT = `SELECT * FROM students WHERE ${namaKolom} = '${value}'`
      db.serialize(function(){
        db.each(ATRIBUTE_STUDENT, function(err, data){
          err?console.log(err):console.log(data);
          })
        })
      }
      static birthStudent(month){
        let BIRTH_STUDENT = `SELECT * FROM student WHERE strftime('%m', birthdate) = '${month}'`
        db.serialize(function(){
          db.each(BIRTH_Student, function(err, data){
            err?console.log(err) : console.log(data);
            })
          })
        }
        static sortStudent(){
          let SORT_STUDENT = `SELECT * FROM student ORDER BY strftime('%m', birthdate)`
          db.serialize(function(){
            db.each(SORT_Student, function(err, data){
              err?console.log(err) : console.log(data);
              })
            })
          }
        static help(){
          console.log('addStudent(firstname, lastname, birthdate)');
          console.log('updateStudent(firtname, lastname, birthdate, id))');
          console.log('deleteStudent(id)');
          console.log('showStudent(id)');
          console.log('nameStudent(stringName)');
          console.log('atributeStudent(namaKolom, value)');
          console.log('birthStudent(month)');
          console.log('sortStudent()');
        }
  }
  let start = repl.start('> ')
  start.context.addStudent = Student.addStudent;
  start.context.updateStudent = Student.updateStudent;
  start.context.deleteStudent = Student.deleteStudent;
  start.context.showDataStudent = Student.showDataStudent;
  start.context.nameStudent = Student.nameStudent;
  start.context.atributeStudent = Student.atributeStudent;
  start.context.birthStudent = Student.birthStudent;
  start.context.sortStudent = Student.sortStudent;
  start.context.help = Student.help;

// let start = repl.start('> ')
// start.context.
