"use strict"
const repl   = require('repl');
const sqlite = require('sqlite3').verbose();

var file = 'student.db'
var db   = new sqlite.Database(file)

class StudentRoster {
  static getQuery(option) {
    switch (option) {
      case 'insert':
        return (values) => {
          let formatedValues = values.map((val) => { return `"${val}"` })
          return `INSERT INTO student VALUES (null,${formatedValues.join(',')});`
        }
        break;
      case 'update':
        return (id, col, newVal) => {
          return `UPDATE student SET ${col}="${newVal}" WHERE id=${id};`
        }
        break;
      case 'delete':
        return (id) => {
          return `DELETE FROM student WHERE id="${id};"`
        }
        break;
      default:
    }
  }

  static insertQuery(values) {
    let insert = StudentRoster.getQuery('insert')
    db.serialize(() => {
      db.run(insert(values), err => {
        if (err) console.log(err)
        else console.log('Insert data')
      })
    })
  }

  static updateQuery(id, col, newVal) {
    let update = StudentRoster.getQuery('update')
    db.serialize(() => {
      db.run(update(id, col, newVal), err => {
        if (err) console.log(err)
        else console.log('Updated data')
      })
    })
  }

  static deleteQuery(id) {
    let deleteq = StudentRoster.getQuery('delete')
    db.serialize(() => {
      db.run(deleteq(id), err => {
        if (err) console.log(err)
        else console.log('Deleted data')
      })
    })
  }

  static showStudents() {
    let query = 'SELECT * FROM student;'
    db.serialize(() => {
      db.each(query, (err, row) => {
        console.log(row)
      })
    })
  }

  static getByName(name) {
    let query = `SELECT * FROM student WHERE firstname="${name}" OR lastname="${name}";`
    db.serialize(() => {
      db.each(query, (err, row) => {
        console.log(row)
      })
    })
  }

  static getByAttribute(attr, value) {
    let query = `SELECT * FROM student WHERE ${attr}="${value}";`
    db.serialize(() => {
      db.each(query, (err, row) => {
        console.log(row)
      })
    })
  }

  static birthdayThisMonth() {
    let query = `SELECT * FROM student WHERE strftime('%m',birthdate)=strftime('%m','now');`
    db.serialize(() => {
      db.each(query, (err, row) => {
        console.log(row)
      })
    })
  }

  static orderByDate() {
    let query = `SELECT * FROM student ORDER BY strftime('%m',birthdate);`
    db.serialize(() => {
      db.each(query, (err, row) => {
        console.log(row)
      })
    })
  }

  // TODO: Show help of commands
  static help() {
    console.log()
  }
}

// let studentRoster = new StudentRoster()

let input = repl.start('Command here: ')
input.context.insert            = StudentRoster.insertQuery
input.context.update            = StudentRoster.updateQuery
input.context.del               = StudentRoster.deleteQuery
input.context.allstudent        = StudentRoster.showStudents
input.context.name              = StudentRoster.getByName
input.context.attribute         = StudentRoster.getByAttribute
input.context.birthdaythismonth = StudentRoster.birthdayThisMonth
input.context.orderbybirthdate  = StudentRoster.orderByDate


// input.context.seed_data    = seedData
