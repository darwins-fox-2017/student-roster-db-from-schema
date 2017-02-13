"use strict"

const REPL = require('repl');
const SQLITE = require('sqlite3').verbose();

let file = 'student_roster.db';
let db = new SQLITE.Database(file);

let CREATE_TABLE = 'CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, birthdate DATE)';

// create table
let createTable = () => {
  db.serialize(function() {
    db.run(CREATE_TABLE, function(err) {
      (err) ? console.log(err) : console.log('table berhasil dibuat');
    });
  });
}

class Student {
  static addStudent (firstname, lastname, birthdate) {
    let INSERT_STUDENT = `INSERT INTO student (firstname, lastname, birthdate) VALUES ('${firstname}','${lastname}','${birthdate}')`;
    db.serialize(function() {
      db.run(INSERT_STUDENT, function(err) {
        (err) ? console.log(err) : console.log('data berhasil dimasukkan');
      });
    });
  }

  static updateStudent(firstname, lastname, birthdate, id) {
    var UPDATE_STUDENT = `UPDATE student SET firstname = '${firstname}', lastname = '${lastname}', birthdate = '${birthdate}' WHERE id = '${id}' `;
    db.serialize(function() {
      db.run(UPDATE_STUDENT, function(err) {
        (err) ? console.log(err) : console.log('data berhasil dirubah');
      });
    });
  }

  static deleteStudent(id) {
    var DELETE_STUDENT = `DELETE FROM student WHERE id = '${id}'`;
    db.serialize(function() {
      db.run(DELETE_STUDENT, function(err) {
        (err) ? console.log(err) : console.log('data berhasil dihapus');
      });
    });
  }

  static findByName(name) {
    var FIND_STUDENT = `SELECT * FROM student WHERE firstname = '${name}' OR lastname = '${name}' `;
    db.serialize(function() {
      db.each(FIND_STUDENT, function(err,row) {
        (err) ? console.log(err) : console.log(`Id: ${row.id} | Nama depan: ${row.firstname} | Nama belakang: ${row.lastname}`);
      });
    });
  }

  static selectByAttr(fields) {
    var SELECT_ATTR = `SELECT ${fields} from student;`;
    db.serialize(function() {
      db.each(SELECT_ATTR, function(err,row) {
        (err) ? console.log(err) : console.log(row);
      });
    });
  }

  static getBirthdayByThisMonth() {
    let date = new Date();
    let month = String(date.getMonth() + 1);
    if (month.length == 1) {
      month = '0' + month
    }
    let SELECT_BY_MONTH = `SELECT * FROM student WHERE strftime('%m',"birthdate") = '${month}';`;
    db.serialize(function() {
      db.each(SELECT_BY_MONTH, function(err,row) {
        (err) ? console.log(err) : console.log(row);
      });
    });
  }

  static sortBirthday() {
    var SORT = `SELECT * FROM student ORDER BY strftime('%m, %d', birthdate)`;
    db.serialize(function() {
      db.each(SORT, function(err,row) {
        (err) ? console.log(err) : console.log(row);
      });
    });
  }

  static tolong() {
    console.log(`
      DAFTAR PERINTAH:
      -----------------------------------------------------------------
      tambahData('firstname','lastname','birthdate')
      rubahData('firstname','lastname','birthdate','id')
      hapusData(id)
      cariData('firstname'/'lastname')
      filter('firstname'/'lastname'/'birthdate')
      ultahDiBulanIni()
      sortingUltah()
      `);
  }
}

let replStr = REPL.start('> ');
replStr.context.buatTable = createTable;
replStr.context.tambahData = Student.addStudent;
replStr.context.rubahData = Student.updateStudent;
replStr.context.hapusData = Student.deleteStudent;
replStr.context.cariData = Student.findByName;
replStr.context.filter = Student.selectByAttr;
replStr.context.ultahDiBulanIni = Student.getBirthdayByThisMonth;
replStr.context.sortingUltah = Student.sortBirthday;
replStr.context.help = Student.tolong;

console.log("Ketik help() untuk menampilkan perintah");
