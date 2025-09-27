// toggle between student & faculty views
const container = document.getElementById('container');
const showfaculity = document.getElementById('showfaculity');
const showstudent = document.getElementById('showstudent');

showfaculity.addEventListener('click', function(e) {
  e.preventDefault();                 // prevent anchor default (jump/submit)
  container.classList.add('faculity-mode');
});

showstudent.addEventListener('click', function(e) {
  e.preventDefault();
  container.classList.remove('faculity-mode');
});

// example hardcoded credentials (for demo only)
const validUsername = "THE FLASH";
const validPassword = "12345";

const validFaculityname = "FACULTY";
const validFaculitypass = "54321";

// student form submit
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const enteredUser = document.getElementById("username").value.trim();
  const enteredPass = document.getElementById("password").value.trim();

  if (enteredUser === validUsername && enteredPass === validPassword) {
    localStorage.setItem("currentUser", enteredUser);
    window.location.href = "welcomepage.html";
  } else {
    alert("Invalid student username or password. Try again!");
  }
});

// faculty form submit
document.getElementById("facultyForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const enteredUser = document.getElementById("fusername").value.trim();
  const enteredPass = document.getElementById("fpassword").value.trim();

  if (enteredUser === validFaculityname && enteredPass === validFaculitypass) {
    localStorage.setItem("currentUser", enteredUser);
    window.location.href = "welcome_page.html";
  } else {
    alert("Invalid faculty username or password. Try again!");
  }
});
