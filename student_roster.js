"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

// write your code here
var file = 'student.db';
var db = new sqlite.Database(file);


// SQL statement
var CREATE_TABLE = 'CREATE TABLE IF NOT EXISTS student ( id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birth date DATE)';
var SEED_DATA = 'INSERT INTO student (firstname, lastname, birthdate) VALUES ('Rubi', 'Henjaya', '1986-11-20'), ('Riza', 'Fahmi', '1983-12-31');';

// CREATE_TABLE
class Student () {
  createTable() {
    db.serialize(function() {
      db.run(CREATE_TABLE, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Create table succes!');
        }
      });
    });
    return true;
  }

  addStudent(fname, lname, bdate) {
    db.serialize(function() {
      db.run(SEED_DATA, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Insert data succes!');
        }
      });
    });
    return true;
  }

  updateStudent(fname, lname, bdate, id){
    db.serialize(function() {
      db.run('UPDATE student set firstname = '${fname}', lastname = '${lname}', birthdate = '${bdate}' where id = '${id}'', function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Update data student succes!');
        }
      });
    });
    return true;
  }

  deleteStudent(id){
    db.serialize(function() {
      db.run('DELETE student by '${id}, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Delete student succes!');
        }
      });
    });
    return true;
  }

  showStudent(){
    db.serialize(function() {
      db.each(`SELECT * FROM student`, function(err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log('ID: ${data.id}\nfirstname: ${data.firstname}\nlastname: ${data.lastname}\nbirthdate: ${data.birthdate}');
        }
      });
    });
    return true;
  }

  findByName(name){
    db.serialize(function() {
      db.each(`SELECT * FROM student where firstname LIKE '%${name}' OR lastname LIKE '%${name}'`, function(err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
      });
    });
    return true;
  }

  selectByAttr(fields){
    db.serialize(function() {
      db.each(`SELECT * FROM student where firstname LIKE '${fields}' OR lastname LIKE '${fields}' OR id LIKE '${fields}'`, function(err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log('ID: ${data.id}\nfirstname: ${data.firstname}\nlastname: ${data.lastname}\nbirthdate: ${data.birthdate}');
        }
      });
    });
    return true;
  }

  getBirthdaybyThisMonth(){
    db.serialize(){
      db.each(`SELECT * FROM student where strftime ('%m', birthdate) = strftime ('%m', NOW)`, function(err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log('ID: ${data.id}\nfirstname: ${data.firstname}\nlastname: ${data.lastname}\nbirthdate: ${data.birthdate}');
        }
      })
    })
    return true;
  }

  sortBirthday(){
    db.serialize() {
      db.each(`SELECT * FROM student ORDER by strftime ('%m, %d', birthdate)`, function(err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log('ID: ${data.id}\nfirstname: ${data.firstname}\nlastname: ${data.lastname}\nbirthdate: ${data.birthdate}');
        }
      })
    })
    return true;
  }

  help() {
    console.log(`addStudent('Glen', 'Fredly', '1986-12-12')\nupdateStudent('Mario', 'Bross', '1995-10-10')\ndeleteStudent('12')\nshowStudent()\nfindByName('Glen')\nselectByAttr()\ngetBirthdaybyThisMonth()\nsortBirthday()\nshowStudent()`);
    return true;
  }

}

var newStudent = new student();
var start = repl.start('> ');


//SEED_DATA
// let seedData = () => {
//
// }
