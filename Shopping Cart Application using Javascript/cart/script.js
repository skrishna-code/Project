/* ==========================================
   LOGIN CHECK
========================================== */

let currUser = localStorage.getItem("currUser");

if (!currUser) {
    window.location.href = "../login.html";
}


/* ==========================================
   CART
========================================== */

let cart = JSON.parse(
    localStorage.getItem("cart") || "[]"
);


/* ==========================================
   ELEMENTS
========================================== */

let cartItems =
    document.getElementById("cartItems");

let checkoutList =
    document.getElementById("checkoutList");

let totalElement =
    document.getElementById("total");

let checkoutBtn =
    document.getElementById("checkoutBtn");

let cartCount =
    document.getElementById("cartCount");


/* ==========================================
   CART COUNT
========================================== */

function updateCartCount() {

    let currentCart =
        JSON.parse(
            localStorage.getItem("cart") || "[]"
        );

    let count =
        currentCart.length;

    if (count > 0) {

        cartCount.textContent = count;

        cartCount.style.display =
            "inline-block";

    } else {

        cartCount.style.display =
            "none";
    }
}


/* ==========================================
   DISPLAY CART
========================================== */

function displayCart() {

    cartItems.innerHTML = "";

    checkoutList.innerHTML = "";


    /* ==========================================
       EMPTY CART
    ========================================== */

    if (cart.length === 0) {

        let emptyContainer =
            document.createElement("div");

        emptyContainer.className =
            "empty-cart";


        let emptyText =
            document.createElement("p");

        emptyText.textContent =
            "Your cart is empty.";


        let shopButton =
            document.createElement("button");

        shopButton.className =
            "go-shop-btn";

        shopButton.textContent =
            "Go To Shop";


        shopButton.addEventListener(
            "click",
            function () {

                window.location.href =
                    "../shop/index.html";

            }
        );


        emptyContainer.appendChild(
            emptyText
        );

        emptyContainer.appendChild(
            shopButton
        );


        cartItems.appendChild(
            emptyContainer
        );


        checkoutList.innerHTML =
            "<p>No items</p>";


        totalElement.textContent =
            "0.00";


        updateCartCount();

        return;
    }


    /* ==========================================
       CART HAS PRODUCTS
    ========================================== */

    let total = 0;


    cart.forEach(
        function (product, index) {

            total += Number(
                product.price
            );


            /* =========================
               CARD
            ========================= */

            let item =
                document.createElement("div");

            item.className =
                "cart-item";


            /* =========================
               IMAGE
            ========================= */

            let image =
                document.createElement("img");

            image.src =
                product.image;

            image.alt =
                product.title;


            /* =========================
               INFORMATION
            ========================= */

            let info =
                document.createElement("div");

            info.className =
                "cart-info";


            /* =========================
               PRICE + SIZE
            ========================= */

            let priceRow =
                document.createElement("div");

            priceRow.className =
                "cart-price-row";


            let price =
                document.createElement("span");

            price.className =
                "cart-price";

            price.textContent =
                "$" +
                Number(product.price).toFixed(2);


            let size =
                document.createElement("span");

            size.className =
                "cart-size";


            if (
                product.sizes &&
                product.sizes.length > 0
            ) {

                size.textContent =
                    product.sizes.join(",");

            } else {

                size.textContent = "";
            }


            priceRow.appendChild(
                price
            );

            priceRow.appendChild(
                size
            );


            /* =========================
               COLORS
            ========================= */

            let colorsDiv =
                document.createElement("div");

            colorsDiv.className =
                "cart-colors";


            let colorsText =
                document.createElement("span");

            colorsText.textContent =
                "Colors:";


            colorsDiv.appendChild(
                colorsText
            );


            if (
                product.colors &&
                product.colors.length > 0
            ) {

                product.colors.forEach(
                    function (color) {

                        let dot =
                            document.createElement(
                                "span"
                            );

                        dot.className =
                            "color-dot";

                        dot.style.backgroundColor =
                            color;

                        colorsDiv.appendChild(
                            dot
                        );

                    }
                );
            }


            /* =========================
               RATING
            ========================= */

            let ratingDiv =
                document.createElement("div");

            ratingDiv.className =
                "cart-rating";


            let ratingText =
                document.createElement("span");

            ratingText.textContent =
                "Rating:";


            let stars =
                document.createElement("span");

            stars.className =
                "cart-stars";


            let productRating =
                Number(
                    product.rating || 0
                );


            let fullStars =
                Math.round(
                    productRating
                );


            stars.textContent =
                "★".repeat(fullStars);


            ratingDiv.appendChild(
                ratingText
            );

            ratingDiv.appendChild(
                stars
            );


            /* =========================
               ADD INFORMATION
            ========================= */

            info.appendChild(
                priceRow
            );

            info.appendChild(
                colorsDiv
            );

            info.appendChild(
                ratingDiv
            );


            /* =========================
               REMOVE BUTTON
            ========================= */

            let removeBtn =
                document.createElement(
                    "button"
                );

            removeBtn.className =
                "remove-btn";

            removeBtn.textContent =
                "Remove From Cart";


            removeBtn.addEventListener(
                "click",
                function () {

                    removeFromCart(
                        product.id
                    );

                }
            );


            /* =========================
               ADD CARD ELEMENTS
            ========================= */

            item.appendChild(
                image
            );

            item.appendChild(
                info
            );

            item.appendChild(
                removeBtn
            );


            cartItems.appendChild(
                item
            );


            /* ==========================================
               CHECKOUT LIST
            ========================================== */

            let checkoutItem =
                document.createElement(
                    "div"
                );

            checkoutItem.className =
                "checkout-item";


            let checkoutTitle =
                document.createElement(
                    "span"
                );

            checkoutTitle.textContent =
                (index + 1) +
                ". " +
                product.title;


            let checkoutPrice =
                document.createElement(
                    "span"
                );

            checkoutPrice.textContent =
                "$" +
                Number(product.price).toFixed(2);


            checkoutItem.appendChild(
                checkoutTitle
            );

            checkoutItem.appendChild(
                checkoutPrice
            );


            checkoutList.appendChild(
                checkoutItem
            );

        }
    );


    /* ==========================================
       TOTAL
    ========================================== */

    totalElement.textContent =
        total.toFixed(2);


    updateCartCount();
}


/* ==========================================
   REMOVE FROM CART
========================================== */

function removeFromCart(productId) {

    cart =
        cart.filter(
            function (product) {

                return product.id !== productId;

            }
        );


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    displayCart();
}


/* ==========================================
   RAZORPAY CHECKOUT
========================================== */

checkoutBtn.addEventListener(
    "click",
    function () {

        if (cart.length === 0) {

            alert(
                "Your cart is empty."
            );

            return;
        }


        let total =
            cart.reduce(
                function (sum, product) {

                    return (
                        sum +
                        Number(product.price)
                    );

                },
                0
            );


        let currentUser =
            JSON.parse(
                localStorage.getItem(
                    "currUser"
                ) || "null"
            );


        let options = {

            key:
                "rzp_test_GfditonZroqbtl",

            amount:
                Math.round(
                    total * 100
                ),

            currency:
                "INR",

            name:
                "MeShop.",

            description:
                "Shopping Cart Payment",


            handler:
                function (response) {

                    alert(
                        "Payment successful!\n\n" +
                        "Payment ID: " +
                        response.razorpay_payment_id
                    );


                    cart = [];


                    localStorage.setItem(
                        "cart",
                        JSON.stringify(cart)
                    );


                    displayCart();

                },


            prefill: {

                email:
                    currentUser
                        ? currentUser.email
                        : ""

            },


            theme: {

                color:
                    "#000000"

            }

        };


        let razorpay =
            new Razorpay(options);


        razorpay.on(
            "payment.failed",
            function (response) {

                alert(
                    "Payment Failed\n\n" +
                    response.error.description
                );

            }
        );


        razorpay.open();

    }
);


/* ==========================================
   INITIAL LOAD
========================================== */

updateCartCount();

displayCart();