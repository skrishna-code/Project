let fname = document.getElementById("fname");
let lname = document.getElementById("lname");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");

let signup = document.getElementById("signup");

let error = document.getElementById("error");
let success = document.getElementById("success");


signup.addEventListener("click", function () {

    error.textContent = "";
    success.textContent = "";


    /* ==========================================
       CHECK EMPTY FIELDS
    ========================================== */

    if (
        fname.value.trim() === "" ||
        lname.value.trim() === "" ||
        email.value.trim() === "" ||
        password.value.trim() === "" ||
        confirmPassword.value.trim() === ""
    ) {

        error.textContent =
            "Please fill all the fields";

        return;
    }


    /* ==========================================
       CHECK PASSWORD
    ========================================== */

    if (
        password.value !==
        confirmPassword.value
    ) {

        error.textContent =
            "Password and Confirm Password do not match";

        return;
    }


    /* ==========================================
       GET EXISTING USERS
    ========================================== */

    let users;

    try {

        users = JSON.parse(
            localStorage.getItem("user") || "[]"
        );

        if (!Array.isArray(users)) {
            users = [];
        }

    } catch (e) {

        users = [];
    }


    /* ==========================================
       CHECK EXISTING USER
    ========================================== */

    let existingUser =
        users.find(function (user) {

            return (
                user.email.toLowerCase() ===
                email.value.trim().toLowerCase()
            );

        });


    if (existingUser) {

        error.textContent =
            "User already exists";

        return;
    }


    /* ==========================================
       CREATE NEW USER
    ========================================== */

    let newUser = {

        fname:
            fname.value.trim(),

        lname:
            lname.value.trim(),

        email:
            email.value.trim(),

        password:
            password.value,

        createdAt:
            new Date().toISOString()

    };


    /* ==========================================
       SAVE USER
    ========================================== */

    users.push(newUser);

    localStorage.setItem(
        "user",
        JSON.stringify(users)
    );


    /* ==========================================
       SUCCESS MESSAGE
    ========================================== */

    let seconds = 5;

    success.textContent =
        "User registered successfully. Redirecting to Login page in "
        + seconds +
        " seconds...";


    /* ==========================================
       DISABLE SIGNUP BUTTON
    ========================================== */

    signup.disabled = true;

    signup.style.cursor = "not-allowed";

    signup.style.opacity = "0.6";


    /* ==========================================
       COUNTDOWN
    ========================================== */

    let countdown =
        setInterval(function () {

            seconds--;


            if (seconds > 0) {

                success.textContent =
                    "User registered successfully. Redirecting to Login page in "
                    + seconds +
                    " seconds...";

            } else {

                clearInterval(countdown);

                window.location.href =
                    "login.html";

            }

        }, 1000);

});