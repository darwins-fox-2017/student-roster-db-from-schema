"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var file = 'student.db'
var db = new sqlite.Database(file)

class Student {
  static help() {
    console.log("=======================================")
    console.log("Help Page")
    console.log("=======================================")
    console.log("1. student.listAll() -> Untuk menampilkan seluruh data murid")
    console.log("2. student.add() -> Untuk menambah data murid")
    console.log("3. student.edit() -> Untuk mengedit data murid berdasarkan id")
    console.log("4. student.delete() -> Untuk menghapus data murid berdasarkan id")
    console.log("5. student.findByName() -> Untuk menampilkan seluruh data murid berdasarkan nama")
    console.log("6. student.findByValue() -> Untuk menampilkan nama berdasarkan kolom")
    console.log("7. student.thisMonthBirthdayStudent() -> Untuk menampilkan seluruh data murid yang ultah di bulan ini")
    console.log("8. student.listBirthdayStudent() -> Untuk menampilkan seluruh data murid sesuai dengan tanggal lahir")
    return true
  }

  static listAll() {
    var SELECT_ALL = "SELECT * FROM students";
    db.serialize(function() {
      db.each(SELECT_ALL, function(err, row) {
        if (err) {
          console.log(err)
        } else {
          console.log(`\nID : ${row.id}\nNama : ${row.firstname} ${row.lastname}\nTTL : ${row.birthdate}`)
        }
      });
    })
  }

  static add(firstname, lastname, birthdate) {
    var SEED_DATA = `INSERT INTO students(firstname, lastname, birthdate) VALUES ('${firstname}', '${lastname}', '${birthdate}')`
    db.serialize(function() {
      db.run(SEED_DATA, function(err, row) {
        if (err) {
          console.log(err)
        } else {
          console.log(SEED_DATA, "Succeed! Data berhasil ditambahkan")
        }
      });
    })
  }

  static edit(id, firstname, lastname, birthdate) {
    var UPDATE_DATA = `UPDATE students SET firstname = '${firstname}', lastname = '${lastname}', birthdate= '${birthdate}' WHERE id = '${id}'`
    db.serialize(function() {
      db.run(UPDATE_DATA, function(err, row) {
        if (err) {
          console.log(err)
        } else {
          console.log(UPDATE_DATA, "Succeed! Data berhasil ditambahkan")
        }
      })
    })
  }

  static delete(id) {
    var DELETE_DATA = `DELETE FROM students WHERE id = ${id}`
    db.serialize(function() {
      db.run(DELETE_DATA, function(err, row) {
        if (err) {
          console.log(err)
        } else {
          console.log(DELETE_DATA, "Succeed! Data berhasil dihapus")
        }
      })
    })
  }

  static findByName(name) {
    var FIND_NAME = `SELECT * FROM students WHERE firstname LIKE '%${name}' OR lastname LIKE '%${name}'`
    db.serialize(function() {
      db.each(FIND_NAME, function(err, row) {
        if (err) {
          console.log(err)
        } else {
          console.log(`\nID : ${row.id}\nNama : ${row.firstname} ${row.lastname}\nTTL : ${row.birthdate}`)
        }
      })
    })
  }

  static findByValue(field, value) {
    var FIND_VALUE = `SELECT * FROM students WHERE ${field} LIKE '%${value}'`
    db.serialize(function() {
      db.each(FIND_VALUE, function(err, row) {
        if (err) {
          console.log(err)
        } else {
          console.log(`\nID : ${row.id}\nNama : ${row.firstname} ${row.lastname}\nTTL : ${row.birthdate}`)
        }
      })
    })
  }

  static thisMonthBirthdayStudent() {
    var FIND_BIRTHDAY = `SELECT * FROM students WHERE strftime('%m', birthdate) = strftime('%m', 'now')`
    db.serialize(function() {
      db.each(FIND_BIRTHDAY, function(err, row) {
        if (err) {
          console.log(err)
        } else {
          console.log(`\nID : ${row.id}\nNama : ${row.firstname} ${row.lastname}\nTTL : ${row.birthdate}`)
        }
      })
    })
  }

  static listBirthdayStudent() {
    var LIST_BIRTHDAY = `SELECT * FROM students ORDER BY strftime('%m', birthdate) ASC`
    console.log(LIST_BIRTHDAY)
    db.serialize(function() {
      db.each(LIST_BIRTHDAY, function(err, row) {
        if (err) {
          console.log(err)
        } else {
          console.log(`\nID : ${row.id}\nNama : ${row.firstname} ${row.lastname}\nTTL : ${row.birthdate}`)
        }
      })
    })
  }
}

var r = repl.start('> ')
//var student = new Student()
r.context.student = Student // ('Rubi', 'Henjaya', '1986-11-20')
