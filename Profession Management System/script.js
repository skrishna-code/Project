// ==========================================
// Employee Array
// ==========================================

let employees = [];


// ==========================================
// Get HTML Elements
// ==========================================

const nameInput = document.getElementById("name");
const professionInput = document.getElementById("profession");
const ageInput = document.getElementById("age");

const addUserBtn = document.getElementById("addUserBtn");

const message = document.getElementById("message");

const employeeCount = document.getElementById("employeeCount");

const employeeList = document.getElementById("employeeList");


// ==========================================
// Add User
// ==========================================

addUserBtn.addEventListener("click", function () {

    // Get values from input fields

    const name = nameInput.value.trim();

    const profession = professionInput.value.trim();

    const age = ageInput.value.trim();


    // ======================================
    // Check Empty Fields
    // ======================================

    if (name === "" || profession === "" || age === "") {

        message.innerText =
            "Error : Please Make Sure All the fields are filled before adding an employee !";

        message.className = "error";

        return;
    }


    // ======================================
    // Create Employee Object
    // ======================================

    const newEmployee = {
        id: Date.now(),
        name: name,
        profession: profession,
        age: age
    };


    // ======================================
    // Add Employee to Array
    // ======================================

    employees.push(newEmployee);


    // ======================================
    // Show Success Message
    // ======================================

    message.innerText = "Success : Employee Added!";

    message.className = "success";


    // ======================================
    // Clear Input Fields
    // ======================================

    nameInput.value = "";

    professionInput.value = "";

    ageInput.value = "";


    // ======================================
    // Display Employees
    // ======================================

    displayEmployees();

});


// ==========================================
// Display Employees
// ==========================================

function displayEmployees() {

    // Clear old employee list

    employeeList.innerHTML = "";


    // Update employee count

    employeeCount.innerText =
        `You have ${employees.length} Employees.`;


    // ======================================
    // Map Employee Array
    // ======================================

    employees.map(function (employee, index) {

        // Create employee div

        const employeeDiv = document.createElement("div");

        employeeDiv.className = "employee";


        // ==================================
        // Employee Information
        // ==================================

        employeeDiv.innerHTML = `

            <div class="employee-info">

                <span class="number">
                    ${index + 1}.
                </span>

                <span class="name">
                    Name : ${employee.name}
                </span>

                <span class="profession">
                    Profession: ${employee.profession}
                </span>

                <span class="age">
                    Age:${employee.age}
                </span>

            </div>


            <button
                class="delete-btn"
                onclick="deleteEmployee(${employee.id})">

                Delete User

            </button>

        `;


        // Add employee to page

        employeeList.appendChild(employeeDiv);

    });

}


// ==========================================
// Delete Employee
// ==========================================

function deleteEmployee(id) {

    employees = employees.filter(function (employee) {

        return employee.id !== id;

    });


    // Update the screen

    displayEmployees();

}


// ==========================================
// Initial Display
// ==========================================

displayEmployees();