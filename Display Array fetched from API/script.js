// ==========================================
// DOM ELEMENTS
// ==========================================

const fetchBtn = document.getElementById("fetchBtn");
const status = document.getElementById("status");

const postsBody = document.getElementById("postsBody");
const productsBody = document.getElementById("productsBody");
const todosBody = document.getElementById("todosBody");


// ==========================================
// API 1 - POSTS
// Delay: 1000 milliseconds
// ==========================================

function PromiseAPI1() {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            fetch("https://dummyjson.com/posts")

                .then(response => {

                    // Check if API response is successful
                    if (!response.ok) {
                        throw new Error("Posts API failed");
                    }

                    return response.json();
                })

                .then(data => {

                    // Clear old data
                    postsBody.innerHTML = "";

                    // Display Posts data
                    data.posts.forEach(post => {

                        const row = document.createElement("tr");

                        row.innerHTML = `
                            <td>${post.id}</td>
                            <td>${post.title}</td>
                            <td>${post.body}</td>
                            <td>${post.views}</td>
                        `;

                        postsBody.appendChild(row);
                    });

                    console.log("API 1 completed: Posts");

                    // Resolve only AFTER displaying data
                    resolve(true);
                })

                .catch(error => {

                    console.error(error);

                    postsBody.innerHTML = `
                        <tr>
                            <td colspan="4">
                                Failed to load posts.
                            </td>
                        </tr>
                    `;

                    reject(error);
                });

        }, 1000);

    });
}


// ==========================================
// API 2 - PRODUCTS
// Delay: 2000 milliseconds
// ==========================================

function PromiseAPI2() {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            fetch("https://dummyjson.com/products")

                .then(response => {

                    if (!response.ok) {
                        throw new Error("Products API failed");
                    }

                    return response.json();
                })

                .then(data => {

                    // Clear old data
                    productsBody.innerHTML = "";

                    // Display Products data
                    data.products.forEach(product => {

                        const row = document.createElement("tr");

                        row.innerHTML = `
                            <td>${product.id}</td>
                            <td>${product.title}</td>
                            <td>${product.category}</td>
                            <td>$${product.price}</td>
                            <td>⭐ ${product.rating}</td>
                        `;

                        productsBody.appendChild(row);
                    });

                    console.log("API 2 completed: Products");

                    // Resolve after displaying data
                    resolve(true);
                })

                .catch(error => {

                    console.error(error);

                    productsBody.innerHTML = `
                        <tr>
                            <td colspan="5">
                                Failed to load products.
                            </td>
                        </tr>
                    `;

                    reject(error);
                });

        }, 2000);

    });
}


// ==========================================
// API 3 - TODOS
// Delay: 3000 milliseconds
// ==========================================

function PromiseAPI3() {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            fetch("https://dummyjson.com/todos")

                .then(response => {

                    if (!response.ok) {
                        throw new Error("Todos API failed");
                    }

                    return response.json();
                })

                .then(data => {

                    // Clear old data
                    todosBody.innerHTML = "";

                    // Display Todos data
                    data.todos.forEach(todo => {

                        const row = document.createElement("tr");

                        row.innerHTML = `
                            <td>${todo.id}</td>
                            <td>${todo.todo}</td>
                            <td>
                                ${todo.completed ? "✅ Completed" : "❌ Pending"}
                            </td>
                            <td>${todo.userId}</td>
                        `;

                        todosBody.appendChild(row);
                    });

                    console.log("API 3 completed: Todos");

                    // Resolve after displaying data
                    resolve(true);
                })

                .catch(error => {

                    console.error(error);

                    todosBody.innerHTML = `
                        <tr>
                            <td colspan="4">
                                Failed to load todos.
                            </td>
                        </tr>
                    `;

                    reject(error);
                });

        }, 3000);

    });
}


// ==========================================
// BUTTON CLICK EVENT
// ==========================================

fetchBtn.addEventListener("click", () => {

    // Disable button while APIs are running
    fetchBtn.disabled = true;

    status.textContent = "Starting API 1...";
    status.className = "loading";


    // ======================================
    // PROMISE CHAINING
    // ======================================

    PromiseAPI1()

        .then(api1Resolved => {

            /*
             * IF CONDITION
             *
             * API 2 will execute only when
             * API 1 has resolved with true.
             */

            if (api1Resolved === true) {

                status.textContent = "API 1 completed → Starting API 2...";

                return PromiseAPI2();
            }

        })

        .then(api2Resolved => {

            /*
             * IF CONDITION
             *
             * API 3 will execute only when
             * API 2 has resolved with true.
             */

            if (api2Resolved === true) {

                status.textContent = "API 2 completed → Starting API 3...";

                return PromiseAPI3();
            }

        })

        .then(api3Resolved => {

            /*
             * API 3 has finished.
             */

            if (api3Resolved === true) {

                status.textContent =
                    "🎉 All three APIs completed successfully!";

                status.className = "success";

                fetchBtn.disabled = false;
            }

        })

        .catch(error => {

            console.error("Promise chain error:", error);

            status.textContent =
                "Something went wrong while fetching data.";

            status.className = "error";

            fetchBtn.disabled = false;
        });

});