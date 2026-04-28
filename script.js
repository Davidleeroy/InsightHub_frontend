const API="http://localhost:5000";


async function register(){

await fetch(API+"/register",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name:name.value,
email:email.value,
password:password.value
})
});

alert("Registered");
}



async function login(){

let res=
await fetch(API+"/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
email:email.value,
password:password.value
})

});

let data=await res.json();

localStorage.setItem(
"user",
JSON.stringify(data)
);

window.location="dashboard.html";
}



async function submitProject(){

let user=
JSON.parse(
localStorage.getItem("user")
);

await fetch(
API+"/projects",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({
user_id:user.id,
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

alert("Submitted");
}



async function searchProjects(){

let keyword=
document.getElementById(
"keyword"
).value;

let res=
await fetch(
API+"/projects?keyword="+keyword
);

let data=
await res.json();

let html="";

data.forEach(p=>{

html+=`
<div class='project-card'>
<h3>${p.title}</h3>

<p>${p.description}</p>

<a href='project-details.html?id=${p.id}'>
View
</a>

</div>
`;

});

projects.innerHTML=html;

}



async function addComment(){

await fetch(
API+"/comments",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({
user_id:1,
project_id:1,
comment:comment.value
})
});

alert("Comment added");

}



async function bookmarkProject(){

await fetch(
API+"/bookmark",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({
user_id:1,
project_id:1
})
});

alert("Bookmarked");
}



async function loadPending(){

let res=
await fetch(
API+"/projects/pending"
);

let data=
await res.json();

let html="";

data.forEach(p=>{

html+=`
<div class='project-card'>
<h3>${p.title}</h3>

<button
onclick='approve(${p.id})'>
Approve
</button>

<button
onclick='reject(${p.id})'>
Reject
</button>

</div>
`;

});

pendingProjects.innerHTML=html;
}



async function approve(id){
await fetch(
API+"/admin/approve/"+id,
{method:"PUT"}
);
loadPending();
}


async function reject(id){
await fetch(
API+"/admin/reject/"+id,
{method:"PUT"}
);
loadPending();
}