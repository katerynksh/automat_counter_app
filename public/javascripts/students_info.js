const student = document.querySelector('.student');
const findButton = document.querySelector('.findbutton');
const Information = document.querySelector('.information');
const studentNameField = document.querySelector('#student-name');
const studentSurnameField = document.querySelector('#student-surname');
const studentSpecialtyField = document.querySelector('#student-specialty');
const studentGroupField = document.querySelector('#student-group');
const yearOfStudyField = document.querySelector('#year-of-study');
const additionalInfoField = document.querySelector('#additional-info');

// Clear student details
function clearStudentDetails() {
  studentNameField.textContent = '';
  studentSurnameField.textContent = '';
  studentSpecialtyField.textContent = '';
  studentGroupField.textContent = '';
  yearOfStudyField.textContent = '';
  additionalInfoField.textContent = '';
}

// Display student details
function displayStudentDetails(studentData) {
  studentNameField.textContent = "Name: " + studentData.full_name;
  studentSurnameField.textContent = "Surname: " + studentData.surname;
  studentSpecialtyField.textContent = "Specialty: " + studentData.specialty;
  studentGroupField.textContent = "Group: " + studentData.group_name;
  yearOfStudyField.textContent = "Year of Study: " + studentData.year_of_study;
  additionalInfoField.textContent = "Additional Info: " + (studentData.additional_info || 'N/A');
}

// Search for student
findButton.onclick = function() {
  const searchTerm = student.value.trim();
  
  if (!searchTerm) {
    alert('Please enter a student name or surname');
    return;
  }

  // Clear previous results
  clearStudentDetails();

  // Fetch student data from API
  fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        displayStudentDetails(data);
      }
    })
    .catch(error => {
      console.error('Error searching for student:', error);
      alert('An error occurred while searching. Please try again.');
    });
};

// Allow Enter key to trigger search
student.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    findButton.click();
  }
});