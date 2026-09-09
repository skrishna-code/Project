// ======================================================
// RESTAURANT FOOD ORDERING SYSTEM
// ======================================================


// ======================================================
// API URL
// ======================================================

const API_URL =
    "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json";


// ======================================================
// GLOBAL VARIABLES
// ======================================================

let menu = [];

let order = {};


// ======================================================
// DOM ELEMENTS
// ======================================================

const menuContainer =
    document.getElementById("menuContainer");

const orderBtn =
    document.getElementById("orderBtn");

const searchInput =
    document.getElementById("searchInput");

const cartCount =
    document.getElementById("cartCount");


// ======================================================
// PART 1
// getMenu()
// ======================================================

function getMenu() {

    return fetch(API_URL)

        .then((response) => {

            if (!response.ok) {
                throw new Error("Failed to fetch menu");
            }

            return response.json();
        })

        .then((data) => {

            menu = data;

            console.log("✅ Menu loaded successfully");

            console.log(menu);

            displayMenu(menu);

            return menu;
        })

        .catch((error) => {

            console.error(
                "❌ Error while fetching menu:",
                error
            );

            if (menuContainer) {

                menuContainer.innerHTML = `
                    <div class="loading">
                        ❌ Failed to load menu.
                        <br>
                        Please refresh the page.
                    </div>
                `;
            }
        });
}


// ======================================================
// DISPLAY MENU
// ======================================================

function displayMenu(items) {

    if (!menuContainer) {
        return;
    }


    menuContainer.innerHTML = "";


    if (!items || items.length === 0) {

        menuContainer.innerHTML = `
            <div class="loading">
                No food items found.
            </div>
        `;

        return;
    }


    items.forEach((item) => {

        const card =
            document.createElement("div");


        card.className =
            "food-card";


        card.innerHTML = `

            <img
                class="food-image"
                src="${item.imgSrc}"
                alt="${item.name}"
                onerror="
                    this.src =
                    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80'
                "
            >

            <div class="food-info">

                <div>

                    <h3 class="food-name">
                        ${item.name}
                    </h3>

                    <p class="food-price">
                        $${Number(item.price).toFixed(2)}
                    </p>

                </div>

                <button
                    class="add-btn"
                    data-id="${item.id}"
                >
                    +
                </button>

            </div>
        `;


        const addButton =
            card.querySelector(".add-btn");


        addButton.addEventListener(
            "click",
            () => {

                addToCart(item.id);

            }
        );


        menuContainer.appendChild(card);

    });
}


// ======================================================
// ADD TO CART
// ======================================================

function addToCart(id) {

    const item =
        menu.find(
            (food) =>
                String(food.id) === String(id)
        );


    if (!item) {

        console.error(
            "Food item not found"
        );

        return;
    }


    // Increase cart count

    const currentCount =
        Number(cartCount.textContent);


    cartCount.textContent =
        currentCount + 1;


    console.log(
        `🛒 ${item.name} added to cart`
    );
}


// ======================================================
// PART 2
// TakeOrder()
// ======================================================

function TakeOrder() {

    return new Promise((resolve, reject) => {

        console.log(
            "🛒 Taking order..."
        );


        setTimeout(() => {

            try {

                // --------------------------------------
                // Find all burgers
                // --------------------------------------

                const burgers =
                    menu.filter((item) => {

                        return item.name
                            .toLowerCase()
                            .includes("burger");

                    });


                // --------------------------------------
                // Check burger availability
                // --------------------------------------

                if (burgers.length < 3) {

                    reject(
                        new Error(
                            "At least 3 burgers are required."
                        )
                    );

                    return;
                }


                // --------------------------------------
                // Randomly shuffle burgers
                // --------------------------------------

                const shuffledBurgers =
                    [...burgers].sort(
                        () =>
                            Math.random() - 0.5
                    );


                // --------------------------------------
                // Select exactly 3 burgers
                // --------------------------------------

                const selectedBurgers =
                    shuffledBurgers.slice(0, 3);


                // --------------------------------------
                // Create order object
                // --------------------------------------

                order = {

                    burger1:
                        selectedBurgers[0],

                    burger2:
                        selectedBurgers[1],

                    burger3:
                        selectedBurgers[2]

                };


                console.log(
                    "🍔 Three random burgers selected:"
                );

                console.log(order);


                // --------------------------------------
                // Resolve order
                // --------------------------------------

                resolve(order);

            }

            catch (error) {

                reject(error);

            }

        }, 2500);

    });
}


// ======================================================
// PART 3
// orderPrep()
// ======================================================

function orderPrep(order) {

    return new Promise((resolve, reject) => {

        console.log(
            "👨‍🍳 Preparing the order..."
        );


        setTimeout(() => {

            try {

                const preparationResult = {

                    order_status: true,

                    paid: false

                };


                console.log(
                    "👨‍🍳 Order preparation completed"
                );


                console.log(
                    preparationResult
                );


                resolve(
                    preparationResult
                );

            }

            catch (error) {

                reject(error);

            }

        }, 1500);

    });
}


// ======================================================
// PART 4
// payOrder()
// ======================================================

function payOrder(order) {

    return new Promise((resolve, reject) => {

        console.log(
            "💳 Processing payment..."
        );


        setTimeout(() => {

            try {

                const paymentResult = {

                    order_status: true,

                    paid: true

                };


                console.log(
                    "💳 Payment completed successfully"
                );


                console.log(
                    paymentResult
                );


                resolve(
                    paymentResult
                );

            }

            catch (error) {

                reject(error);

            }

        }, 1000);

    });
}


// ======================================================
// PART 5
// thankyouFnc()
// ======================================================

function thankyouFnc() {

    console.log(
        "🎉 Thank you for your order!"
    );


    alert(
        "Thank you for eating with us today!"
    );
}


// ======================================================
// PART 6
// PROMISE CHAINING
// ======================================================

function startOrdering() {

    console.log(
        "===================================="
    );

    console.log(
        "🚀 ORDER PROCESS STARTED"
    );

    console.log(
        "===================================="
    );


    if (menu.length === 0) {

        alert(
            "Menu is still loading. Please wait."
        );

        return;
    }


    // Disable button while order is processing

    if (orderBtn) {

        orderBtn.disabled = true;

        orderBtn.textContent =
            "Processing...";
    }


    // ==================================================
    // STEP 1 - Take Order
    // ==================================================

    TakeOrder()

        .then((order) => {

            console.log(
                "✅ TakeOrder() resolved"
            );

            console.log(
                "Selected Order:",
                order
            );


            // ==================================================
            // STEP 2 - Prepare Order
            // ==================================================

            return orderPrep(order);

        })


        .then((result) => {

            console.log(
                "✅ orderPrep() resolved"
            );

            console.log(
                "Preparation Result:",
                result
            );


            // Check preparation result

            if (
                result.order_status === true &&
                result.paid === false
            ) {

                return payOrder(result);

            }


            throw new Error(
                "Order preparation failed."
            );

        })


        .then((result) => {

            console.log(
                "✅ payOrder() resolved"
            );

            console.log(
                "Payment Result:",
                result
            );


            // ==================================================
            // STEP 3 - Check Payment
            // ==================================================

            if (
                result.order_status === true &&
                result.paid === true
            ) {

                // Payment successful

                thankyouFnc();

            }

            else {

                throw new Error(
                    "Payment failed."
                );

            }

        })


        // ==================================================
        // ERROR HANDLING
        // ==================================================

        .catch((error) => {

            console.error(
                "❌ Order process failed:",
                error
            );


            alert(
                "Something went wrong while processing your order."
            );

        })


        // ==================================================
        // FINALLY
        // ==================================================

        .finally(() => {

            if (orderBtn) {

                orderBtn.disabled = false;

                orderBtn.textContent =
                    "🛒 Take Order";

            }

        });

}
// ======================================================
// ORDER BUTTON EVENT
// ======================================================

if (orderBtn) {

    orderBtn.addEventListener(
        "click",
        startOrdering
    );

}
// ======================================================
// SEARCH FOOD
// ======================================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        (event) => {

            const searchText =
                event.target.value
                    .toLowerCase()
                    .trim();


            const filteredMenu =
                menu.filter((item) => {

                    return item.name
                        .toLowerCase()
                        .includes(searchText);

                });


            displayMenu(
                filteredMenu
            );

        }
    );

}
// ======================================================
// INITIALIZE APPLICATION
// ======================================================

console.log(
    "🍽️ Restaurant application started"
);


getMenu();