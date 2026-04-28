const API="http://localhost:5000";
<a href="/details.html?id=${p.id}">
View Full Project
</a>


/* LOAD FULL PROJECT INFO */
async function loadProject(){

let params=
new URLSearchParams(
window.location.search
);

let id=params.get("id") || 1;

let res=
await fetch(
API+"/projects/"+id
);

let project=
await res.json();

document.getElementById(
"projectTitle"
).innerText=project.title;

document.getElementById(
"description"
).innerText=project.description;

}
fetch("http://localhost:5000/projects")
.then(res=>res.json())
.then(data=>{

let html="";

data.forEach(project=>{

html += `
<div class="project-card">

<h3>${project.title}</h3>
<p>${project.student}</p>
<p>${project.description}</p>

<a href="/details.html?id=${project.id}">
View Full Project
</a>

</div>
`;

});

document.getElementById(
"projectsContainer"
).innerHTML = html;

});

window.onload=loadProject;

async function loadPendingProjects(){

let res=
await fetch(
"http://localhost:5000/admin/pending"
);

let data=await res.json();

let html="";

data.forEach(project=>{

html+=`
<div class="project-card">

<h2>${project.title}</h2>
<p>${project.student}</p>

<button onclick="approveProject(${project.id})">
Approve
</button>

<button onclick="rejectProject(${project.id})">
Reject
</button>

<button onclick="deleteProject(${project.id})">
Delete
</button>

</div>
`;

});

document.getElementById(
"pendingProjects"
).innerHTML=html;

}

async function approveProject(id){
await fetch(
"http://localhost:5000/admin/approve/"+id,
{method:"PUT"}
);
location.reload();
}

async function rejectProject(id){
await fetch(
"http://localhost:5000/admin/reject/"+id,
{method:"PUT"}
);
location.reload();
}

async function deleteProject(id){
await fetch(
"http://localhost:5000/admin/delete/"+id,
{method:"DELETE"}
);
location.reload();
}

window.onload=loadPendingProjects;


/* BOOKMARK FEATURE */
async function bookmarkProject(){

await fetch(
API+"/bookmark",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
user_id:1,
project_id:1
})
}
);

alert("Project bookmarked");

}


/* REQUEST ACCESS */
async function requestAccess(){

await fetch(
API+"/request-access",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
user_id:1,
project_id:1,
message:"Please grant access"
})
}
);

alert("Access request sent");

}


/* COMMENTS / FEEDBACK */
async function addComment(){

let comment=
document.getElementById(
"commentInput"
).value;

if(!comment) return;


await fetch(
API+"/comments",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
user_id:1,
project_id:1,
comment:comment
})
}
);


let li=
document.createElement("li");

li.innerText=comment;

document
.getElementById("commentsList")
.appendChild(li);

document
.getElementById("commentInput")
.value="";

}



async function submitProject(){

await fetch(
API+"/projects",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
user_id:1,
title:title.value,
description:description.value,
department:department.value,
supervisor:supervisor.value,
year:year.value,
technology:technology.value,
pdf_url:pdf.value,
video_url:video.value
})
});

}



async function bookmarkProject(){

await fetch(
API+"/bookmark",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
user_id:1,
project_id:1
})
});

}



async function addComment(){

await fetch(
API+"/comments",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
user_id:1,
project_id:1,
comment:comment.value
})
});

}



async function requestAccess(){

await fetch(
API+"/request-access",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
user_id:1,
project_id:1,
message:"Requesting access"
})
});

}