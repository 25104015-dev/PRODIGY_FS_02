// ===============================
// Employee Management System
// script.js
// ===============================

// ---------- Login ----------

const loginForm = document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener("submit",function(e){

e.preventDefault();

let username=document.getElementById("username").value.trim();

let password=document.getElementById("password").value.trim();

if(username==="admin" && password==="admin123"){

localStorage.setItem("loggedIn","true");

window.location="dashboard.html";

}

else{

alert("Invalid Username or Password");

}

});

}

// ---------- Check Login ----------

function checkLogin(){

if(localStorage.getItem("loggedIn")!="true"){

window.location="index.html";

}

}

// ---------- Logout ----------

function logout(){

if(confirm("Are you sure you want to logout?")){

localStorage.removeItem("loggedIn");

window.location="index.html";

}

}

// ---------- Dashboard ----------

document.addEventListener("DOMContentLoaded",function(){

if(document.getElementById("employeeCount")){

dashboard();

}

});

// ---------- Dashboard Function ----------

function dashboard(){

let employees=JSON.parse(localStorage.getItem("employees"))||[];

let totalSalary=0;

employees.forEach(emp=>{

totalSalary+=Number(emp.salary||0);

});

// Employee Count

document.getElementById("employeeCount").innerHTML=employees.length;

// Salary

document.getElementById("salaryCount").innerHTML="₹"+totalSalary;

// Greeting

let hour=new Date().getHours();

let greet="";

if(hour<12){

greet="Good Morning ☀";

}

else if(hour<18){

greet="Good Afternoon 🌞";

}

else{

greet="Good Evening 🌙";

}

document.getElementById("greeting").innerHTML=greet+", Admin";

// Today's Date

document.getElementById("today").innerHTML=new Date().toDateString();

// Recent Employees

let recent=document.getElementById("recentEmployees");

if(recent){

recent.innerHTML="";

if(employees.length==0){

recent.innerHTML="<tr><td colspan='4'>No Employees Found</td></tr>";

}

else{

employees.slice(-5).reverse().forEach(emp=>{

recent.innerHTML+=`

<tr>

<td>${emp.id}</td>

<td>${emp.name}</td>

<td>${emp.department}</td>

<td>₹${emp.salary}</td>

</tr>

`;

});

}

}

}

// ---------- Live Clock ----------

setInterval(function(){

let clock=document.getElementById("clock");

if(clock){

clock.innerHTML=new Date().toLocaleTimeString();

}

},1000);

// ---------- Theme ----------

function changeTheme(){

document.body.classList.toggle("dark");

}

// ---------- Statistics ----------

function getTotalEmployees(){

let employees=JSON.parse(localStorage.getItem("employees"))||[];

return employees.length;

}

function getTotalSalary(){

let employees=JSON.parse(localStorage.getItem("employees"))||[];

let total=0;

employees.forEach(emp=>{

total+=Number(emp.salary||0);

});

return total;

}

// ---------- Notification ----------

function showMessage(msg){

alert(msg);

}

console.log("Employee Management System Loaded Successfully");