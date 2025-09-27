// Demo: generate 52 students
function generateStudents() {
  return Array.from({ length: 52 }, (_, i) => {
    return { roll: i + 1, name: "Student " + (i + 1) };
  });
}
const students = generateStudents();

// Section tabs
function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
showSection('attendance');

// Live Clock
function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent = "⏰ " + now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// ------------------- Attendance Section -------------------
function loadAttendanceList() {
  const course = document.getElementById('attCourse').value;
  const semester = document.getElementById('attSemester').value;
  const section = document.getElementById('attSection').value;
  const list = document.getElementById('attendanceList');
  list.innerHTML = "";

  if (!course || !semester || !section) return;

  students.forEach(stu => {
    const div = document.createElement('div');
    div.className = "student";
    div.textContent = "🎓 Roll " + stu.roll + " - " + stu.name;
    div.addEventListener('click', () => {
      window.location.href = `student_attendance.html?roll=${stu.roll}&course=${course}&sem=${semester}&sec=${section}`;
    });
    list.appendChild(div);
  });
}

// ------------------- Today's Attendance Section -------------------
function loadTodayStudents() {
  const course = document.getElementById('course').value;
  const semester = document.getElementById('semester').value;
  const section = document.getElementById('section').value;
  const subject = document.getElementById('subject').value;
  const date = document.getElementById('attendanceDate').value;
  const list = document.getElementById('todayList');
  list.innerHTML = "";

  if (!course || !semester || !section || !subject || !date) return;

  const key = `${course}_${semester}_${section}_${subject}_${date}`;
  let todayData = JSON.parse(localStorage.getItem(key)) || {};

  students.forEach(stu => {
    const div = document.createElement('div');
    div.className = "student";
    div.innerHTML = `
      <span>🎓 Roll ${stu.roll} - ${stu.name}</span>
      <div class="actions">
        <button class="present-btn">✅ Present</button>
        <button class="absent-btn">❌ Absent</button>
        <button class="reset-btn">🔄 Reset</button>
      </div>
    `;
    // Restore previous data
    if (todayData[stu.roll] === "present") div.classList.add('present');
    if (todayData[stu.roll] === "absent") div.classList.add('absent');

    div.querySelector('.present-btn').addEventListener('click', () => {
      div.classList.remove('absent');
      div.classList.add('present');
      todayData[stu.roll] = "present";
      localStorage.setItem(key, JSON.stringify(todayData));
    });
    div.querySelector('.absent-btn').addEventListener('click', () => {
      div.classList.remove('present');
      div.classList.add('absent');
      todayData[stu.roll] = "absent";
      localStorage.setItem(key, JSON.stringify(todayData));
    });
    div.querySelector('.reset-btn').addEventListener('click', () => {
      div.classList.remove('present', 'absent');
      delete todayData[stu.roll];
      localStorage.setItem(key, JSON.stringify(todayData));
    });

    list.appendChild(div);
  });
}
