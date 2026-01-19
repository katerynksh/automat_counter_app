const student = document.querySelector('.student');
const findButton = document.querySelector('.findbutton');
const Information = document.querySelector('.information');
const studentNameField = document.querySelector('#student-name');
const studentSurnameField = document.querySelector('#student-surname');
const studentSpecialtyField = document.querySelector('#student-specialty');
const studentGroupField = document.querySelector('#student-group');
const yearOfStudyField = document.querySelector('#year-of-study');
const additionalInfoField = document.querySelector('#additional-info');


// const fs = require('fs');
// import fs from 'fs';
findButton.onclick = function() {
    
  //   try {
  //   const data = fs.readFileSync('/studentsname.json', 'utf8');
  //   const jsonData = JSON.parse(data); // Manually parse the string data
  // //  return jsonData;
  // console.log(jsonData);
  // } catch (error) {
  //   console.error('Error reading JSON file:', error);
  //   throw error;
  // }
 fetch('/studentsname.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            const studentData = data.find(s => s.fullName + " " + s.surname === student.value);
            const studentData1 = data.find(s => s.fullName === student.value);
            const studentData2 = data.find(s => s.surname === student.value);
            const studentData3 = data.find(s => s.surname + " " + s.fullName === student.value);
            const studentData4 = data.find(s => s.Name === student.value);
            const studentData5 = data.find(s => s.shortName === student.value);
            const studentData6 = data.find(s => s.shortName + " " + s.surname === student.value);
            const studentData7 = data.find(s => s.surname + " " + s.shortName === student.value);
            if (studentData) {
                studentNameField.textContent = "Name: " + studentData.fullName;
                studentSurnameField.textContent = "Surname: " + studentData.surname;
                studentSpecialtyField.textContent = "Specialty: " + studentData.specialty;
                studentGroupField.textContent = "Group: " + studentData.group;
                yearOfStudyField.textContent = "Year of Study: " + studentData.yearOfStudy;
                additionalInfoField.textContent = "Additional Info: " + studentData.additionalInfo;
            } else if (studentData1) {
                studentNameField.textContent = "Name: " + studentData1.fullName;
                studentSurnameField.textContent = "Surname: " + studentData1.surname;
                studentSpecialtyField.textContent = "Specialty: " + studentData1.specialty;
                studentGroupField.textContent = "Group: " + studentData1.group;
                yearOfStudyField.textContent = "Year of Study: " + studentData1.yearOfStudy;
                additionalInfoField.textContent = "Additional Info: " + studentData1.additionalInfo;
            } else if (studentData2) {
                studentNameField.textContent = "Name: " + studentData2.fullName;
                studentSurnameField.textContent = "Surname: " + studentData2.surname;
                studentSpecialtyField.textContent = "Specialty: " + studentData2.specialty;
                studentGroupField.textContent = "Group: " + studentData2.group;
                yearOfStudyField.textContent = "Year of Study: " + studentData2.yearOfStudy;
                additionalInfoField.textContent = "Additional Info: " + studentData2.additionalInfo;
            } else if (studentData3) {
                studentNameField.textContent = "Name: " + studentData3.fullName;
                studentSurnameField.textContent = "Surname: " + studentData3.surname;
                studentSpecialtyField.textContent = "Specialty: " + studentData3.specialty;
                studentGroupField.textContent = "Group: " + studentData3.group;
                yearOfStudyField.textContent = "Year of Study: " + studentData3.yearOfStudy;
                additionalInfoField.textContent = "Additional Info: " + studentData3.additionalInfo;
            } else if (studentData4) {
                studentNameField.textContent = "Name: " + studentData4.fullName;
                studentSurnameField.textContent = "Surname: " + studentData4.surname;
                studentSpecialtyField.textContent = "Specialty: " + studentData4.specialty;
                studentGroupField.textContent = "Group: " + studentData4.group;
                yearOfStudyField.textContent = "Year of Study: " + studentData4.yearOfStudy;
                additionalInfoField.textContent = "Additional Info: " + studentData4.additionalInfo;
            } else if (studentData5) {
                studentNameField.textContent = "Name: " + studentData5.fullName;
                studentSurnameField.textContent = "Surname: " + studentData5.surname;
                studentSpecialtyField.textContent = "Specialty: " + studentData5.specialty;
                studentGroupField.textContent = "Group: " + studentData5.group;
                yearOfStudyField.textContent = "Year of Study: " + studentData5.yearOfStudy;
                additionalInfoField.textContent = "Additional Info: " + studentData5.additionalInfo;  
            } else if (studentData6) {
                studentNameField.textContent = "Name: " + studentData6.fullName;
                studentSurnameField.textContent = "Surname: " + studentData6.surname;
                studentSpecialtyField.textContent = "Specialty: " + studentData6.specialty;
                studentGroupField.textContent = "Group: " + studentData6.group;
                yearOfStudyField.textContent = "Year of Study: " + studentData6.yearOfStudy;
                additionalInfoField.textContent = "Additional Info: " + studentData6.additionalInfo;  
            } else if (studentData7) {
                studentNameField.textContent = "Name: " + studentData7.fullName;
                studentSurnameField.textContent = "Surname: " + studentData7.surname;
                studentSpecialtyField.textContent = "Specialty: " + studentData7.specialty;
                studentGroupField.textContent = "Group: " + studentData7.group;
                yearOfStudyField.textContent = "Year of Study: " + studentData7.yearOfStudy;
                additionalInfoField.textContent = "Additional Info: " + studentData7.additionalInfo;
            } else {
                alert('Student not found');
            }
        })
        .catch(error => {
            console.error('Error reading JSON file:', error);
        });
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
   