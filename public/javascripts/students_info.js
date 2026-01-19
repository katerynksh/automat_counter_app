const student = document.querySelector('.student');
const findButton = document.querySelector('.findbutton');
const Information = document.querySelector('.information');
const studentNameField = document.querySelector('#student-name');
const studentSurnameField = document.querySelector('#student-surname');
const studentSpecialtyField = document.querySelector('#student-specialty');
const studentGroupField = document.querySelector('#student-group');
const yearOfStudyField = document.querySelector('#year-of-study');
const additionalInfoField = document.querySelector('#additional-info');


const fs = require('fs');
// import fs from 'fs';
findButton.onclick = function() {
    
    try {
    const data = fs.readFileSync('/studentsname.json', 'utf8');
    const jsonData = JSON.parse(data); // Manually parse the string data
  //  return jsonData;
  console.log(jsonData);
  } catch (error) {
    console.error('Error reading JSON file:', error);
    throw error;
  }
}
// fetch('/public/studentsname.json')
//     .then(response => response.json())
//     .then(data => {
//         const studentData = data.find(s => s.name === student.value);
//         if (studentData) {
//             studentNameField.textContent = "Name: " + studentData.name;
//             studentSurnameField.textContent = "Surname: " + studentData.surname;
//             studentSpecialtyField.textContent = "Specialty: " + studentData.specialty;
//             studentGroupField.textContent = "Group: " + studentData.group;
//             yearOfStudyField.textContent = "Year of Study: " + studentData.yearOfStudy;
//             additionalInfoField.textContent = "Additional Info: " + studentData.additionalInfo;
//         } else {
//             alert('Student not found');
//         }
//     })
//   // .catch(error => console.error('Error:', error));
// };


/*const fs = require('fs/promises'); // Use fs/promises for promise-based operations

async function readJsonFileNode(/studentsname.json') {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(data); // Manually parse the string data
    return jsonData;
  } catch (error) {
    console.error('Error reading JSON file:', error);
    throw error;
  }
}
*/
   