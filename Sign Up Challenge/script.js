const email = document.getElementById("email");
const password = document.getElementById("password");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const successMessage = document.getElementById("successMessage");

const form = document.getElementById("signupForm");

let emailValid = false;
let passwordValid = false;


// Email validation
email.addEventListener("input", function () {

    const value = email.value;

    if (
        value.length > 3 &&
        value.includes("@") &&
        value.includes(".")
    ) {
        emailValid = true;
        emailError.innerText = "";
    } else {
        emailValid = false;
        emailError.innerText =
            "Make sure email is more than 3 characters and has @ and a .";
    }

    checkValidation();
});


// Password validation
password.addEventListener("input", function () {

    const value = password.value;

    if (value.length > 8) {
        passwordValid = true;
        passwordError.innerText = "";
    } else {
        passwordValid = false;
        passwordError.innerText =
            "Make sure password is more than 8 characters.";
    }

    checkValidation();
});


// Check both inputs
function checkValidation() {

    if (emailValid && passwordValid) {
        emailError.innerText = "";
        passwordError.innerText = "";
        successMessage.innerText = "All good to go";
    } else {
        successMessage.innerText = "";
    }
}


// Submit
form.addEventListener("submit", function (event) {

    event.preventDefault();

    if (!emailValid || !passwordValid) {
        return;
    }

    const confirmation = confirm("Are you sure you want to signup?");

    if (confirmation) {
        alert("Successful signup!");
    } else {
        location.reload();
    }
});