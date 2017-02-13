"use strict"

const repl = require('repl');
const sqlite3 = require('sqlite3').verbose();
let file = 'student.db';
var db = new sqlite3.Database(file);

class Student{

  static addStudent(firstname,lastname,birthdate){
    let query_add_student="INSERT INTO student (first_name,last_name,birthdate) VALUES (?,?,?)"
    db.run(query_add_student, [firstname, lastname,birthdate] ,function(err){
      if (err) {
        console.log(err);
      } else {
        console.log('add new student data success');
      }
    });

    // let query_add_student="INSERT INTO student (first_name,last_name,birthdate) VALUES ($first_name,$last_name,$birthdate)"
    // db.run(query_add_student, {
    //   $first_name: firstname,
    //   $last_name: lastname,
    //   $birthdate: birthdate
    // } ,function(err){
    //   if (err) {
    //     console.log('err');
    //   } else {
    //     console.log('add new student data success');
    //   }
    // })
  }

  static updateData(id,field,updateto){
    let UPDATE_QUERY = `UPDATE student set ${field} = "${updateto}" where id = (?)`;
    db.run(UPDATE_QUERY, [id] ,function(err){
      if (err) {
        console.log(err);
      } else {
        console.log('add new student data success');
      }
    });
  }

  static deleteData(id){
    let DELETE_QUERY = `DELETE FROM student where id = ${id}`;
    db.run(DELETE_QUERY ,function(err){
      if (err) {
        console.log(err);
      } else {
        console.log(`delect student with ${id} success`);
      }
    });
  }

  static showAll(){
    let SHOW_QUERY=`SELECT * FROM student`
    db.each(SHOW_QUERY,function(err,row){
      if (err) {
        console.log(err);
      } else {
        console.log(row);
      }
    })

  }

  static showAll(){
    let SHOW_QUERY=`SELECT * FROM student`
    db.each(SHOW_QUERY,function(err,row){
      if (err) {
        console.log(err);
      } else {
        console.log(row);
      }
    })

  }

  static showNameFilter(name){
    let SHOW_NAME_FILTER_QUERY=`SELECT * FROM student WHERE first_name="${name}" or last_name="${name}" `;
    db.each(SHOW_NAME_FILTER_QUERY,function(err,row){
      if (err) {
        console.log(err);
      } else {
        console.log(row);
      }
    })
  }

  static showFreeFilter(field,value){
    let SHOW_BY_FILTER=`SELECT * FROM student WHERE ${field} = (?) `;
    db.each(SHOW_BY_FILTER,[value],function(err,row){
      if (err) {
        console.log(err);
      } else {
        console.log(row);
      }
    });
  }

  static thisMonthBirdday(){
    let  THIS_MONTH_BIRTHDAY = `SELECT * FROM student WHERE strftime('%m',birthdate) = strftime('%m','now') `;
    db.each(THIS_MONTH_BIRTHDAY,function(err,row){
      if (err) {
        console.log(err);
      } else {
        console.log(row);
      }
    });
  }

  static orderByBirthday(){
    let ORDER_BY_BIRTHDAY=`SELECT * FROM student ORDER BY strftime('%d-%m',student.birthdate)`;
    db.each(ORDER_BY_BIRTHDAY,function(err,row){
      if (err) {
        console.log(err);
      } else {
        console.log(row);
      }
    });
  }

  static help(){
    console.log("--------this apps menu--------");
    console.log('add student data : addstudent -> addstudent(firstname,lastname,birthdate)');
    console.log('update student data : update -> addstudent(id,field,value)');
    console.log('delete student data : deldata-> deldata(id)');
    console.log('show all student data : showall-> showall()');
    console.log('show  student filter by name  : showfiltername-> showfiltername(name)');
    console.log('show  student filter free by user  : showfiltername-> showfiltername(filed,value)');
    console.log('show  student birthday this month  : thismothbirthday-> thismothbirthday()')
    console.log('show  student order by birthday  : orderbybirthday-> orderbybirthday()')
    console.log('help : help-> help()')
  }
}


let r=repl.start('=> ');
r.context.addstudent = Student.addStudent;
r.context.update = Student.updateData;
r.context.deldata = Student.deleteData;
r.context.showall = Student.showAll;
r.context.showfiltername = Student.showNameFilter;
r.context.showfreefilter = Student.showFreeFilter;
r.context.thismothbirthday = Student.thisMonthBirdday;
r.context.orderbybirthday = Student.orderByBirthday;
r.context.help = Student.help;
