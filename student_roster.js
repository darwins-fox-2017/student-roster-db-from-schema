"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var file = 'student.db';
var db = new sqlite.Database(file);

// write your code here
class Student {

  static tambahData(firstname, lastname, birthdate) {
    let addDataStudent = `INSERT INTO student (firstname, lastname, birthdate) VALUES ('${firstname}', '${lastname}', '${birthdate}');`

    // RUN SQL one at a time
    db.serialize(function() {
  		// CREATE TABLE
  		db.run(addDataStudent, function(err) {
  			if(err) {
  				console.log(err);
  			} else {
  				console.log('TAMBAH data berhasil!')
  			}
  		});
  	});
  }

  static updateData(firstname, lastname, birthdate, id) {

    let UpdateDataStudent = `UPDATE student SET firstname = '${firstname}', lastname = '${lastname}', birthdate = '${birthdate}' WHERE id = '${id}';`
    // RUN SQL one at a time
    db.serialize(function() {
  		// CREATE TABLE
  		db.run(UpdateDataStudent, function(err) {
  			if(err) {
  				console.log(err);
  			} else {
  				console.log('UPDATE TABLE berhasil!')
  			}
  		});
  	});
  }

  static delete(id) {
    let DeleteStudent = `DELETE FROM student WHERE id = '${id}';`

    db.serialize(function() {
  		// CREATE TABLE
  		db.run(DeleteStudent, function(err) {
  			if(err) {
  				console.log(err);
  			} else {
  				console.log('DELETE DATA berhasil!')
  			}
  		});
  	});
  }

  static tampilSemuaData() {
    let tampilData = `SELECT * FROM student`

    db.serialize(function() {
  		// CREATE TABLE
  		db.all(tampilData, function(err, data) {
  			if(err) {
  				console.log(err);
  			} else {
  				console.log(data)
  			}
  		});
  	});
  }

  static namaStudent(string_name) {
    let name_student = `SELECT * FROM student WHERE firstname LIKE '${string_name}' OR lastname LIKE '${string_name}'`

    db.serialize(function() {
  		// CREATE TABLE
  		db.each(name_student, function(err, data) {
  			if(err) {
  				console.log(err);
  			} else {
  				console.log(data)
  			}
  		});
  	});
  }

  static namaAttribut(namaKolom, value) {
    let attr_name = `SELECT * FROM student WHERE ${namaKolom} = '${value}'`

    db.serialize(function() {
  		// CREATE TABLE
  		db.each(attr_name, function(err, data) {
  			if(err) {
  				console.log(err);
  			} else {
  				console.log(data)
  			}
  		});
  	});
  }

  static studentBirthday(month) {
    let student_birthday = `SELECT * FROM student WHERE strftime('%m', birthdate) = '${month}'`

    db.serialize(function() {
  		// CREATE TABLE
  		db.each(student_birthday, function(err, data) {
  			if(err) {
  				console.log(err);
  			} else {
  				console.log(data)
  			}
  		});
  	});
  }

  static studentSorting() {
    let stundet_sort = `SELECT * FROM student ORDER BY strftime('%m', birthdate)`

    db.serialize(function() {
      // CREATE TABLE
      db.each(stundet_sort, function(err, data) {
        if(err) {
          console.log(err);
        } else {
          console.log(data)
        }
      });
    });
  }

  static help() {

    console.log('1. tambahData(firstname, lastname, birthdate) - Menambah Data Student')
    console.log('2. updateData(firstname, lastname, birthdate) - Update Data Student berdasarkan id')
    console.log('3. delete(id) - Menghapus Data Student')
    console.log('4. tampilSemuaData() - Tampil Daftar Semua Student')
    console.log('5. namaStudent(string_name) - Tampil Nama Student Berdasarkan firstname atau lastname')
    console.log('6. namaAttribut(namaKolom) - Menampilkan Berdasarkan Attribut Tertentu')
    console.log('7. studentBirthday(month) - Menampilkan Student yang Berulang Tahun')
    console.log('8. studentSorting() - Mengurutkan Data Student Berdasarkan Bulan Ulang Tahun')
    console.log('9. help() - Tampil CRUD')
  }
}

let start = repl.start('> ')
// let data = new Student()
start.context.Student = Student
// start.context.TambahData = TambahData
// start.context.UpdateData = UpdateData
// start.context.Delete = Delete
//start.context.TampilSemuaData = TampilSemuaData
