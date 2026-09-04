const tableContainer = document.getElementById("tableContainer");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const sortAZ = document.getElementById("sortAZ");
const sortZA = document.getElementById("sortZA");
const sortMarks = document.getElementById("sortMarks");
const sortPassing = document.getElementById("sortPassing");
const sortClass = document.getElementById("sortClass");
const sortGender = document.getElementById("sortGender");

let students = [];
let currentData = [];

/*
    Load JSON data
*/
fetch(
    "https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json"
)
    .then(response => response.json())
    .then(data => {
        students = data;
        currentData = [...students];

        displayTable(currentData);
    })
    .catch(error => {
        console.error("Error loading data:", error);
    });


/*
    Create table
*/
function displayTable(data) {

    tableContainer.innerHTML = "";

    const tableWrapper = document.createElement("div");
    tableWrapper.className = "table-wrapper";

    const table = document.createElement("table");

    table.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Class</th>
                <th>Marks</th>
                <th>Passing</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = table.querySelector("tbody");

    data.forEach(student => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>

            <td>
                <div class="name-cell">
                    <img src="${student.img_src}" alt="${student.first_name}">
                    <span>
                        ${student.first_name} ${student.last_name}
                    </span>
                </div>
            </td>

            <td>${student.gender}</td>

            <td>${student.class}</td>

            <td>${student.marks}</td>

            <td>${student.passing ? "passing" : "failed"}</td>

            <td>${student.email}</td>
        `;

        tbody.appendChild(row);
    });

    tableWrapper.appendChild(table);
    tableContainer.appendChild(tableWrapper);
}


/*
    SEARCH
*/
function searchStudents() {

    const searchValue = searchInput.value
        .trim()
        .toLowerCase();

    currentData = students.filter(student => {

        const firstName = student.first_name.toLowerCase();
        const lastName = student.last_name.toLowerCase();
        const email = student.email.toLowerCase();

        return (
            firstName.includes(searchValue) ||
            lastName.includes(searchValue) ||
            email.includes(searchValue)
        );
    });

    displayTable(currentData);
}


/*
    Search while typing
*/
searchInput.addEventListener("input", searchStudents);


/*
    Search button
*/
searchBtn.addEventListener("click", searchStudents);


/*
    A → Z
*/
sortAZ.addEventListener("click", () => {

    currentData.sort((a, b) => {

        const nameA =
            `${a.first_name} ${a.last_name}`.toLowerCase();

        const nameB =
            `${b.first_name} ${b.last_name}`.toLowerCase();

        return nameA.localeCompare(nameB);
    });

    displayTable(currentData);
});


/*
    Z → A
*/
sortZA.addEventListener("click", () => {

    currentData.sort((a, b) => {

        const nameA =
            `${a.first_name} ${a.last_name}`.toLowerCase();

        const nameB =
            `${b.first_name} ${b.last_name}`.toLowerCase();

        return nameB.localeCompare(nameA);
    });

    displayTable(currentData);
});


/*
    Sort by Marks
*/
sortMarks.addEventListener("click", () => {

    currentData.sort((a, b) => {
        return a.marks - b.marks;
    });

    displayTable(currentData);
});


/*
    Show only passing students
*/
sortPassing.addEventListener("click", () => {

    currentData = students.filter(student => {
        return student.passing === true;
    });

    displayTable(currentData);
});


/*
    Sort by Class
*/
sortClass.addEventListener("click", () => {

    currentData.sort((a, b) => {
        return a.class - b.class;
    });

    displayTable(currentData);
});


/*
    Sort by Gender
*/
sortGender.addEventListener("click", () => {

    const femaleStudents = students.filter(student => {
        return student.gender === "Female";
    });

    const maleStudents = students.filter(student => {
        return student.gender === "Male";
    });

    displayGenderTables(
        femaleStudents,
        maleStudents
    );
});


/*
    Gender tables
*/
function displayGenderTables(femaleStudents, maleStudents) {

    tableContainer.innerHTML = "";

    createGenderTable(
        "Female Students",
        femaleStudents
    );

    createGenderTable(
        "Male Students",
        maleStudents
    );
}


/*
    Create individual gender table
*/
function createGenderTable(title, data) {

    const titleElement = document.createElement("div");

    titleElement.className = "gender-title";
    titleElement.textContent = title;

    tableContainer.appendChild(titleElement);

    const tableWrapper = document.createElement("div");
    tableWrapper.className = "table-wrapper";

    const table = document.createElement("table");

    table.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Class</th>
                <th>Marks</th>
                <th>Passing</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = table.querySelector("tbody");

    data.forEach(student => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>

            <td>
                <div class="name-cell">
                    <img
                        src="${student.img_src}"
                        alt="${student.first_name}"
                    >
                    <span>
                        ${student.first_name} ${student.last_name}
                    </span>
                </div>
            </td>

            <td>${student.gender}</td>
            <td>${student.class}</td>
            <td>${student.marks}</td>
            <td>${student.passing ? "passing" : "failed"}</td>
            <td>${student.email}</td>
        `;

        tbody.appendChild(row);
    });

    tableWrapper.appendChild(table);

    tableContainer.appendChild(tableWrapper);
}