document.addEventListener("DOMContentLoaded",loadStudents);


/* ADD STUDENT */

function addStudent(){

const name=document.getElementById("name").value;
const mobile=document.getElementById("mobile").value;
const room=document.getElementById("room").value;

fetch("/add-student",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({name,mobile,room})

})

.then(res=>res.text())

.then(()=>{
loadStudents();
});

}


/* LOAD STUDENTS */

function loadStudents(){

fetch("/students")

.then(res=>res.json())

.then(data=>{

const table=document.getElementById("studentTable");

table.innerHTML="";

data.forEach(student=>{

fetch(`/student-status/${student.id}`)

.then(res=>res.json())

.then(statusData=>{

let button;

if(statusData.status=="OUT"){

button=`<button class="in-btn"
onclick="markIn(${student.id})">
IN
</button>`;

}

else{

button=`<button class="out-btn"
onclick="markOut(${student.id})">
OUT
</button>`;

}

const row=document.createElement("tr");

row.innerHTML=`

<td>${student.id}</td>

<td>
<b>Name:</b> ${student.name}<br>
<b>Room:</b> ${student.room}
</td>

<td>
<button onclick="deleteStudent(${student.id})">
Delete
</button>

${button}

</td>

`;

table.appendChild(row);

});

});

});

}


/* DELETE STUDENT */

function deleteStudent(id){

fetch(`/delete-student/${id}`,{
method:"DELETE"
})

.then(()=>loadStudents());

}


/* MARK OUT */

function markOut(id){

fetch(`/mark-out/${id}`,{
method:"POST"
})

.then(()=>loadStudents());

}


/* MARK IN */

function markIn(id){

fetch(`/mark-in/${id}`,{
method:"POST"
})

.then(()=>loadStudents());

}


/* SEARCH STUDENT */

function searchStudent(){

const input=document
.getElementById("search")
.value
.toLowerCase();

const rows=document
.querySelectorAll("#studentTable tr");

rows.forEach(row=>{

const text=row.innerText.toLowerCase();

row.style.display=text.includes(input)?"":"none";

});

}