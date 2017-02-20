"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

// write your code here
var file = 'student.db';
var db = new sqlite.Database(file);

class Student {
  construtctor() {

  }

  add (firstname, lastname, birthdate) {
    let ADD = `INSERT INTO students (firstname, lastname, birthdate) VALUES ('${firstname}', '${lastname}', '${birthdate}');`

    db.serialize(function() {
      db.run(ADD, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('student added');
        }
      });
    });
  }

  update(firstname, lastname, birthdate, id) {
    let UPDATE = `UPDATE students SET firstname = '${firstname}', lastname = '${lastname}', birthdate = '${birthdate}' WHERE id = '${id}';`

    db.serialize(function() {
      db.run(UPDATE, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Student Data Updated');
        }
      });
    });
  }

  delete(id) {
    let DELETE = `DELETE FROM students WHERE id = ${id}`

    db.serialize(function() {
      db.run(DELETE, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Student Data deleted');
        }
      });
    });
  }

  show() {
    let SHOW = `SELECT * FROM students;`

    db.serialize(function() {
      db.each(SHOW, function(err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log(`id: ${data.id} | firstname: ${data.firstname} | lastname: ${data.lastname} | birthdate: ${data.birthdate}`);
        }
      });
    });
  }

  findByName(name) {
    let FIND_NAME = `SELECT * FROM students WHERE firstname = '${name}' OR lastname = '${name}'`

    db.serialize(function() {
      db.each(FIND_NAME, function(err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
      });
    });
  }

  findByAttr(attributes,val){
    // var val = val.toLowerCase()
    let SELECT_ATTR = `SELECT * from students WHERE ${attributes} = '${val}';`
    // console.log(SELECT_ATTR);
    db.serialize(function() {
      db.each(SELECT_ATTR, function(err,data) {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
      });
    });
  }

  birthdayByThisMonth(){
    var date = new Date()
    var month = date.getMonth() + 1;
    var strMonth = String(month)
    if (month.toString().length == 1) {
      strMonth = '0' + String(month)
    }
    var GET_BIRTHDAY_MONTH = `SELECT * FROM students WHERE strftime('%m' , "birthdate") = '${strMonth}'`
    // console.log(GET_BIRTHDAY_MONTH);
    db.serialize(function() {
      db.each(GET_BIRTHDAY_MONTH, function(err, row) {
        if (err) {
          console.log(err);
        } else {
          console.log(row);
        }
      });
    });
  }

  sortBirthday() {
    var SORT = `SELECT * FROM students ORDER BY strftime ('%m, %d', birthdate)`
    db.serialize(function() {
      db.each(SORT, function(err, row) {
        if (err) {
          console.log(err);
        } else {
          console.log(row);
        }
      });
    });
  }
}

let newStudent  = new Student()
let replStart   = repl.start('> ')

replStart.context.add = newStudent.add;
// add ('firstname', 'lastname','birthdate')
// add ('irwin', 'pratajaya','1989-03-21')
replStart.context.update = newStudent.update;
// update ('firstname', 'lastname','birthdate', id)
// update ('irwin', 'p','1989-03-21', 3)
replStart.context.remove = newStudent.delete;
// remove(id)
// remove(4)
replStart.context.show = newStudent.show;
// show()
replStart.context.findByName = newStudent.findByName;
// findByName (name)
// findByName ('irwin')
replStart.context.findByAttr = newStudent.findByAttr;
// findByAttr('attribute','value')
// findByAttr('firstname','irwin')
replStart.context.birthdayByThisMonth = newStudent.birthdayByThisMonth;
// birthdayByThisMonth()
replStart.context.sortBirthday = newStudent.sortBirthday;
// sortBirthday()
