// Get current logged-in user


let currUser = JSON.parse(localStorage.getItem("currUser") || "null");


// If user is not logged in, redirect to login page
if (!currUser) {
    window.location.href = "../login.html";
}


// Get all users
let users = JSON.parse(localStorage.getItem("user") || "[]");

// Find the logged-in user
let currentUserIndex = users.findIndex(function (user) {
    return user.email === currUser.email;
});

// If user is not found
if (currentUserIndex === -1) {
    localStorage.removeItem("currUser");
    window.location.href = "../login.html";
}

// Current user
let currentUser = users[currentUserIndex];


// Profile elements
let fname = document.getElementById("fname");
let lname = document.getElementById("lname");
let saveInfo = document.getElementById("saveInfo");


// Password elements
let oldPassword = document.getElementById("oldPassword");
let newPassword = document.getElementById("newPassword");
let confirmNewPassword = document.getElementById("confirmNewPassword");

let changePassword = document.getElementById("changePassword");


// Logout
let logout = document.getElementById("logout");


// Messages
let profileError = document.getElementById("profileError");
let profileSuccess = document.getElementById("profileSuccess");

let passwordError = document.getElementById("passwordError");
let passwordSuccess = document.getElementById("passwordSuccess");


// Display user's existing information
fname.value = currentUser.fname;
lname.value = currentUser.lname;


// Save Profile Information
saveInfo.addEventListener("click", function () {

    profileError.textContent = "";
    profileSuccess.textContent = "";

    if (
        fname.value.trim() === "" ||
        lname.value.trim() === ""
    ) {
        profileError.textContent = "Please fill all the fields";
        return;
    }

    // Update user information
    users[currentUserIndex].fname = fname.value.trim();
    users[currentUserIndex].lname = lname.value.trim();

    // Save updated users
    localStorage.setItem("user", JSON.stringify(users));

    profileSuccess.textContent = "Profile updated successfully";
});


// Change Password
changePassword.addEventListener("click", function () {

    passwordError.textContent = "";
    passwordSuccess.textContent = "";

    if (
        oldPassword.value.trim() === "" ||
        newPassword.value.trim() === "" ||
        confirmNewPassword.value.trim() === ""
    ) {
        passwordError.textContent = "Please fill all the fields";
        return;
    }

    // Check old password
    if (oldPassword.value !== currentUser.password) {
        passwordError.textContent = "Old password is incorrect";
        return;
    }

    // Check new password
    if (newPassword.value !== confirmNewPassword.value) {
        passwordError.textContent =
            "New password and Confirm New Password do not match";
        return;
    }

    // Update password
    users[currentUserIndex].password = newPassword.value;

    // Save updated users
    localStorage.setItem("user", JSON.stringify(users));

    passwordSuccess.textContent = "Password changed successfully";

    // Clear fields
    oldPassword.value = "";
    newPassword.value = "";
    confirmNewPassword.value = "";
});


// Logout
logout.addEventListener("click", function () {

    localStorage.removeItem("currUser");

    window.location.href = "../login.html";
});