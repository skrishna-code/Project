/** @format */

let arr = [
  { id: 1, name: "john", age: "18", profession: "developer" },
  { id: 2, name: "jack", age: "20", profession: "developer" },
  { id: 3, name: "karen", age: "19", profession: "admin" },
];

function PrintDeveloperbyMap() {
  arr.map(function (employee) {
    if (employee.profession === "developer") {
      console.log(employee);
    }
  });
  
}

function PrintDeveloperbyForEach() {
  arr.forEach(function (employee) {
    if (employee.profession === "developer") {
      console.log(employee);
    }
  });
}

function addData() {
  let NewEmployee = { id: 4, name: "Shrikrishna", age: "24", profession: "intern" };
  arr.push(NewEmployee);
  console.log(arr);
}

function removeAdmin() {
  arr = arr.filter(function (employee) {
    return employee.profession !== "admin";
  });
  console.log(arr);
}


function concatenateArray() {
  let newArr = [
    { id: 5, name: "Meghana", age: "22", profession: "designer" },
    { id: 6, name: "Pratik", age: "23", profession: "manager" },
  ];
  let concatenatedArr = arr.concat(newArr);
  console.log(concatenatedArr);
  //Write your code here, just console.log
}
