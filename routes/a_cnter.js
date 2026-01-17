console.log(`_____________________________________`);
/*
var prompt = require('prompt');

prompt.start();
 
prompt.get(['name', 'surname', 'specialty', 'group', 'marks'], function (err, result) {
  if (err) { return onErr(err); }
  
  const student = {
    properties: {
      name: { description: "Ім'я", required: true },
      surname: { description: "Прізвище", required: true },
      specialty: { description: "Спеціальність", required: true },
      group: { description: "Група", required: true },
      marks: { description: "Оцінки (через кому)", required: true },
    }
  };

  const average = student.marks.reduce((sum, marks) => sum + marks, 0) / student.marks.length;
  const fixedAverage = average.toFixed(2);
  const markAutomat = Math.round(fixedAverage);
  const marks = student.marks.join(', ')

  console.log("Ім'я:" + student.name);
  console.log("Прізвище: " + student.surname);
  console.log("Спеціальність: " + student.specialty);
  console.log("Група: " + student.group);
  console.table("Оцінки: " + marks);
  console.log("Середня оцінка: " + fixedAverage);
  console.log("Автомат: " + markAutomat);
});
*/


var express = require('express');
var router = express.Router();

/* GET cnt page. */
router.get('/', function(req, res, next) {
  //res.send('Automat counter');
  console.log("req.method: " +  req.method);
  console.log("req.path: " + req.path);
  console.log("req.url: " + req.url);
  console.log("req.statusCode: " + req.statusCode);
  console.log("req.baseUrl: " + req.baseUrl);
  res.render('cnt', {title: 'Automat Counter Page'});
//сторінка cnt для вводу даних студента
//  res.render('cnt', { showAlert: true, alertMessage: "Welcome to Automat counter page!" });
});
  
router.post('/', function(req, res, next) {
  var st_name=req.body.stud_name;
  var st_surname=req.body.stud_surname;
  var st_specialty=req.body.stud_specialty;
  var st_group=req.body.stud_group;
  var st_marks=req.body.stud_marks;
  console.log("Student Name: " + st_name);
  console.log("Student Surname: " + st_surname);
  console.log("Student Specialty: " + st_specialty);
  console.log("Student Group: " + st_group);
  console.log("Student Marks: " + st_marks);
});

module.exports = router;

