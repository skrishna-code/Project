const form = document.getElementById("signupForm");
const message = document.getElementById("message");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        message.innerHTML = "Please enter a valid email.";
        message.className = "error";
        return;
    }

    if (password.length < 8) {

        message.innerHTML =
            "Password must contain at least 8 characters.";
        message.className = "error";
        return;
    }

    if (password !== confirmPassword) {

        message.innerHTML =
            "Passwords do not match.";
        message.className = "error";
        return;
    }

    message.innerHTML =
        "Signup Successful!";
    message.className = "success";

    form.reset();

});