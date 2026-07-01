// ===============================
// Employee Management System
// employee.js
// ===============================

let employees = JSON.parse(localStorage.getItem("employees")) || [];
let editIndex = -1;

// Load data
window.onload = function () {
    displayEmployees();
};

// Save Employee
function saveEmployee() {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let department = document.getElementById("department").value;
    let position = document.getElementById("position").value.trim();
    let salary = document.getElementById("salary").value;
    let address = document.getElementById("address").value.trim();

    if (
        name == "" ||
        email == "" ||
        phone == "" ||
        department == "" ||
        position == "" ||
        salary == "" ||
        address == ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    let employee = {
        id: editIndex == -1 ? Date.now() : employees[editIndex].id,
        name,
        email,
        phone,
        department,
        position,
        salary,
        address
    };

    if (editIndex == -1) {
        employees.push(employee);
        alert("Employee Added Successfully");
    } else {
        employees[editIndex] = employee;
        alert("Employee Updated Successfully");
        editIndex = -1;
        document.getElementById("saveBtn").innerHTML = "Save Employee";
    }

    localStorage.setItem("employees", JSON.stringify(employees));

    clearForm();

    displayEmployees();
}

// Display Employees
function displayEmployees() {

    let table = document.getElementById("employeeTable");

    table.innerHTML = "";

    if (employees.length == 0) {

        table.innerHTML =
        `<tr>
            <td colspan="8">No Employee Records Found</td>
        </tr>`;

        return;
    }

    employees.forEach((emp, index) => {

        table.innerHTML += `

<tr>

<td>${emp.id}</td>

<td>${emp.name}</td>

<td>${emp.email}</td>

<td>${emp.phone}</td>

<td>${emp.department}</td>

<td>${emp.position}</td>

<td>₹${emp.salary}</td>

<td>

<button class="edit-btn"
onclick="editEmployee(${index})">

Edit

</button>

<button class="delete-btn"
onclick="deleteEmployee(${index})">

Delete

</button>

</td>

</tr>

`;

    });

}

// Edit
function editEmployee(index) {

    editIndex = index;

    let emp = employees[index];

    document.getElementById("name").value = emp.name;
    document.getElementById("email").value = emp.email;
    document.getElementById("phone").value = emp.phone;
    document.getElementById("department").value = emp.department;
    document.getElementById("position").value = emp.position;
    document.getElementById("salary").value = emp.salary;
    document.getElementById("address").value = emp.address;

    document.getElementById("saveBtn").innerHTML = "Update Employee";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

// Delete
function deleteEmployee(index) {

    if (confirm("Delete this employee?")) {

        employees.splice(index, 1);

        localStorage.setItem(
            "employees",
            JSON.stringify(employees)
        );

        displayEmployees();

    }

}

// Delete All
function resetEmployees() {

    if (confirm("Delete all employees?")) {

        employees = [];

        localStorage.removeItem("employees");

        displayEmployees();

    }

}

// Search
function searchEmployee() {

    let value = document
        .getElementById("search")
        .value
        .toLowerCase();

    let rows = document.querySelectorAll("#employeeTable tr");

    rows.forEach(row => {

        if (row.innerText.toLowerCase().includes(value)) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

}

// Clear Form
function clearForm() {

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("department").selectedIndex = 0;
    document.getElementById("position").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("address").value = "";

}

// Cancel Edit
function cancelEdit() {

    editIndex = -1;

    clearForm();

    document.getElementById("saveBtn").innerHTML = "Save Employee";

}

// Logout
function logout() {

    localStorage.removeItem("loggedIn");

    window.location = "index.html";

}