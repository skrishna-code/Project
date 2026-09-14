let email = document.getElementById("email");
let password = document.getElementById("password");
let login = document.getElementById("login");

function generateToken() {
    return Math.random().toString(36).substring(2) + Date.now();
}

login.addEventListener("click", function () {

    // Check empty fields
    if (email.value.trim() === "" || password.value.trim() === "") {
        alert("Please fill all the fields");
        return;
    }

    // Get registered users
    let users = JSON.parse(localStorage.getItem("user") || "[]");

    // Check email and password
    let filteredUser = users.filter(function (item) {
        return (
            item.email === email.value.trim() &&
            item.password === password.value
        );
    });

    if (filteredUser.length > 0) {

        let user = filteredUser[0];

        // Store currently logged-in user
        localStorage.setItem(
            "currUser",
            JSON.stringify({
                email: user.email,
                token: generateToken()
            })
        );

        // Redirect to profile
        window.location.href = "shop/index.html";

    } else {

        alert("Invalid email or password");

    }
});