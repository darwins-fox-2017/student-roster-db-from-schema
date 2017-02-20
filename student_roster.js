"use strict"

const repl = require('repl');
const sqlite3 = require('sqlite3').verbose();

let file = "student.db"
let db = new sqlite3.Database(file)

// write your code here
class Student {

  createStudent(fname, lname, dob) {
    db.serialize(() => {
      let query = `INSERT INTO students(firstname, lastname, birthdate) VALUES ('${fname}', '${lname}', '${dob}');`
      db.run(query, (err) => {
        if(err)
          console.log(err)
        else {
          console.log("Input data berhasil");
        }
      })
    })
  }


  readStudent() {
    db.serialize(() => {
      let query = `SELECT id, firstname, lastname, birthdate FROM students;`
      db.each(query, (err, row) => {
        if(err)
          console.log(err)
        else {
            console.log(`ID : ${row.id}\nFull Name : ${row.firstname} ${row.lastname}\nDate Of Birth : ${row.birthdate}\n`)
          }
      })
    })
  }

  updateStudent(id, col, data) {
    db.serialize(() => {
      let query = `UPDATE students SET ${col}='${data}' WHERE id = '${id}';`
      db.run(query, (err) => {
        if(err)
          console.log(err)
        else {
        console.log("Update data berhasil")
        }
      })
    })
  }

  deleteStudent(id) {
    db.serialize(() => {
      let query = `DELETE FROM students WHERE id=${id};`
      db.run(query, (err) => {
        if(err)
          console.log(err)
        else {
          console.log("Delete Berhasil");
        }
      })
    })
  }

  searchName(name) {
    db.serialize(() => {
      let query = `SELECT * FROM students WHERE firstname='${name}' OR lastname='${name}';`
      db.each(query, (err, row) => {
        if(err)
          console.log(err)
        else {
          console.log(`ID : ${row.id}\nFull Name : ${row.firstname} ${row.lastname}\nDate Of Birth : ${row.birthdate}`)
        }
      })
    })
  }

  searchCustom(col, data) {
    db.serialize(() => {
      let query = `SELECT * FROM students WHERE ${col}='${data}';`
      db.each(query, (err, row) => {
        if(err)
          console.log(err)
        else {
          console.log(`ID : ${row.id}\nFull Name : ${row.firstname} ${row.lastname}\nDate Of Birth : ${row.birthdate}`)
        }
      })
    })
  }

  searchBirthMonth() {
    db.serialize(() => {
      let monthNow = ("0" + (new Date().getMonth() + 1)).slice(-2)
      let query = `SELECT * FROM students WHERE strftime('%m', birthdate) = '${monthNow}';`
      db.each(query, (err, row) => {
        if(err)
          console.log(err)
        else {
          console.log(`ID : ${row.id}\nFull Name : ${row.firstname} ${row.lastname}\nDate Of Birth : ${row.birthdate}`)
        }
      })
    })
  }

  readStudentMonth() {
    db.serialize(() => {
      let query = `SELECT * FROM students ORDER BY strftime('%m', birthdate) DESC;`
      db.each(query, (err, row) => {
        if(err)
          console.log(err)
        else {
          console.log(`ID : ${row.id}\nFull Name : ${row.firstname} ${row.lastname}\nDate Of Birth : ${row.birthdate}`)
        }
      })
    })
  }



  help() {
    console.log(`> pelajar.createStudent(firstname, lastname, dob) -> untuk insert ke tabel students`)
    console.log(`> pelajar.readStudent -> untuk menampilkan tabel students`)
    console.log(`> pelajar.udpdateStudent(id, col, data) -> untuk update ke tabel students berdasarkan ID`)
    console.log(`> pelajar.deleteStudent(id) -> untuk delete data students berdasarkan ID`)
    console.log(`> pelajar.searchName(name) -> untuk mencari data di tabel students berdasarkan nama, di cek ke firstname dan lastname`)
    console.log(`> pelajar.searchCustom(col, data) -> untuk mencari data di tabel students berdasarkan col/colom tertentu`)
    console.log(`> pelajar.searchBirthMonth() -> memunculkan data dari tabel dimana data bulan lahir colom birthdate sama dengan bulan ini`);

  }

}

let r = repl.start('> ')

let pelajar = new Student()
r.context.pelajar = pelajar
