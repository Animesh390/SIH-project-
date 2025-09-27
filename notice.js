// notice.js

const titleInput = document.getElementById('title');
const dateInput = document.getElementById('date');
const msgInput = document.getElementById('message');
const photoInput = document.getElementById('photo');
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');

const noticesContainer = document.getElementById('noticesContainer');
const emptyState = document.getElementById('emptyState');
const countEl = document.getElementById('count');
const lastUpdated = document.getElementById('lastUpdated');

let notices = JSON.parse(localStorage.getItem('notices')) || [];

// Helper to read image as Base64
function readImage(file){
  return new Promise((resolve,reject)=>{
    const reader = new FileReader();
    reader.onload = e=>resolve(e.target.result);
    reader.onerror = e=>reject(e);
    reader.readAsDataURL(file);
  });
}

async function addNotice(){
  const title = titleInput.value.trim();
  const date = dateInput.value;
  const msg = msgInput.value.trim();

  if(!title || !date || !msg){
    alert('Please fill all fields.');
    return;
  }

  let imgData = null;
  if(photoInput.files.length>0){
    imgData = await readImage(photoInput.files[0]);
  }

  const notice = {
    id: Date.now(),
    title,
    date,
    msg,
    img: imgData,
    created: new Date().toISOString()
  };

  notices.push(notice);
  localStorage.setItem('notices', JSON.stringify(notices));
  render();
  clearForm();
}

function deleteAll(){
  if(confirm("Clear all notices?")){
    notices = [];
    localStorage.setItem('notices', JSON.stringify(notices));
    render();
  }
}

function clearForm(){
  titleInput.value='';
  dateInput.value='';
  msgInput.value='';
  photoInput.value='';
}

function render(){
  noticesContainer.innerHTML='';
  if(notices.length===0){
    emptyState.style.display='flex';
  }else{
    emptyState.style.display='none';
  }

  notices.slice().reverse().forEach(n=>{
    const div = document.createElement('div');
    div.className='notice';
    div.innerHTML=`
      <div>
        <h3>${n.title}</h3>
        <div class="meta">${n.date}</div>
      </div>
      <p>${n.msg}</p>
      ${n.img ? `<img src="${n.img}" alt="Notice Image">` : ''}
      <div class="meta">Created: ${new Date(n.created).toLocaleString()}</div>
    `;
    noticesContainer.appendChild(div);
  });

  countEl.textContent = notices.length + (notices.length===1?' notice':' notices');
  lastUpdated.textContent = new Date().toLocaleString();
}

addBtn.addEventListener('click', addNotice);
clearBtn.addEventListener('click', deleteAll);

// Initial render
render();
