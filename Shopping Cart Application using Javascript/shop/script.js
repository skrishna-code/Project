/* ==========================================
   LOGIN CHECK
========================================== */

let currUser = localStorage.getItem("currUser");

if (!currUser) {
    window.location.href = "../login.html";
}


/* ==========================================
   VARIABLES
========================================== */

let products = [];

let filteredProducts = [];

let selectedCategory = "all";

let searchText = "";

let selectedColors = [];

let selectedSizes = [];

let selectedPrice = "";

let selectedRating = 0;

let selectedSort = "default";


/* ==========================================
   CART
========================================== */

let cart = JSON.parse(
    localStorage.getItem("cart") || "[]"
);


/* ==========================================
   HTML ELEMENTS
========================================== */

let search = document.getElementById("search");

let categories =
    document.querySelectorAll(".category");

let colorFilters =
    document.querySelectorAll('input[name="color"]');

let sizeFilters =
    document.querySelectorAll('input[name="size"]');

let priceFilters =
    document.querySelectorAll('input[name="price"]');

let rating =
    document.getElementById("rating");

let ratingValue =
    document.getElementById("ratingValue");

let applyFilter =
    document.getElementById("applyFilter");

let sort =
    document.getElementById("sort");

let mensProducts =
    document.getElementById("mensProducts");

let womensProducts =
    document.getElementById("womensProducts");

let jewelleryProducts =
    document.getElementById("jewelleryProducts");

let electronicsProducts =
    document.getElementById("electronicsProducts");

let cartCount =
    document.getElementById("cartCount");


/* ==========================================
   UPDATE CART COUNT
========================================== */

function updateCartCount() {

    let cartItems =
        JSON.parse(
            localStorage.getItem("cart") || "[]"
        );

    let count = cartItems.length;

    if (count > 0) {

        cartCount.textContent = count;

        cartCount.style.display = "inline-block";

    } else {

        cartCount.textContent = "0";

        cartCount.style.display = "none";
    }
}


/* ==========================================
   FETCH PRODUCTS
========================================== */

async function fetchProducts() {

    try {

        let response =
            await fetch(
                "https://fakestoreapi.com/products"
            );

        let data =
            await response.json();


        /*
            Add colors and sizes to products
            because Fake Store API does not
            provide these properties.
        */

        let colors = [
            "red",
            "black",
            "blue",
            "green",
            "white"
        ];

        let sizes = [
            "S",
            "M",
            "L",
            "XL"
        ];


        products = data.map(function (item) {

            let numberOfColors =
                Math.floor(
                    Math.random() * 4
                ) + 1;

            let numberOfSizes =
                Math.floor(
                    Math.random() * 4
                ) + 1;


            return {
                ...item,

                colors:
                    colors.slice(
                        0,
                        numberOfColors
                    ),

                sizes:
                    sizes.slice(
                        0,
                        numberOfSizes
                    ),

                rating:
                    item.rating &&
                    item.rating.rate
                        ? item.rating.rate
                        : 0
            };

        });


        /*
            Save products in localStorage
        */

        localStorage.setItem(
            "products",
            JSON.stringify(products)
        );


        filteredProducts =
            [...products];


        displayProducts();

    } catch (error) {

        console.error(
            "Error fetching products:",
            error
        );

        mensProducts.innerHTML =
            '<p class="no-products">Unable to load products.</p>';

    }
}


/* ==========================================
   DISPLAY PRODUCTS
========================================== */

function displayProducts() {

    mensProducts.innerHTML = "";

    womensProducts.innerHTML = "";

    jewelleryProducts.innerHTML = "";

    electronicsProducts.innerHTML = "";


    /*
        Apply sorting
    */

    let productsToDisplay =
        [...filteredProducts];


    if (selectedSort === "low") {

        productsToDisplay.sort(
            function (a, b) {
                return a.price - b.price;
            }
        );

    } else if (selectedSort === "high") {

        productsToDisplay.sort(
            function (a, b) {
                return b.price - a.price;
            }
        );

    } else if (selectedSort === "rating") {

        productsToDisplay.sort(
            function (a, b) {
                return b.rating - a.rating;
            }
        );
    }


    /*
        Separate by category
    */

    let mens =
        productsToDisplay.filter(
            function (product) {
                return (
                    product.category ===
                    "men's clothing"
                );
            }
        );


    let womens =
        productsToDisplay.filter(
            function (product) {
                return (
                    product.category ===
                    "women's clothing"
                );
            }
        );


    let jewellery =
        productsToDisplay.filter(
            function (product) {
                return (
                    product.category ===
                    "jewelery"
                );
            }
        );


    let electronics =
        productsToDisplay.filter(
            function (product) {
                return (
                    product.category ===
                    "electronics"
                );
            }
        );


    /*
        Display each category
    */

    displayCategory(
        mens,
        mensProducts
    );

    displayCategory(
        womens,
        womensProducts
    );

    displayCategory(
        jewellery,
        jewelleryProducts
    );

    displayCategory(
        electronics,
        electronicsProducts
    );


    /*
        Hide/show category sections
    */

    updateCategoryVisibility();
}


/* ==========================================
   DISPLAY CATEGORY
========================================== */

function displayCategory(
    productList,
    container
) {

    if (productList.length === 0) {

        container.innerHTML =
            '<p class="no-products">No products found.</p>';

        return;
    }


    productList.forEach(
        function (product) {

            let card =
                createProductCard(product);

            container.appendChild(card);

        }
    );
}


/* ==========================================
   CREATE PRODUCT CARD
========================================== */

function createProductCard(product) {

    let card =
        document.createElement("div");

    card.className =
        "product-card";


    /*
        Image
    */

    let image =
        document.createElement("img");

    image.className =
        "product-image";

    image.src =
        product.image;

    image.alt =
        product.title;


    /*
        Details
    */

    let details =
        document.createElement("div");

    details.className =
        "product-details";


    /*
        Price + Size
    */

    let priceRow =
        document.createElement("div");

    priceRow.className =
        "product-price-row";


    let price =
        document.createElement("span");

    price.className =
        "product-price";

    price.textContent =
        "$" + product.price;


    let size =
        document.createElement("span");

    size.className =
        "product-size";

    size.textContent =
        product.sizes.join(",");


    priceRow.appendChild(price);

    priceRow.appendChild(size);


    /*
        Colors
    */

    let colorsDiv =
        document.createElement("div");

    colorsDiv.className =
        "product-colors";


    let colorsText =
        document.createElement("span");

    colorsText.textContent =
        "Colors:";


    colorsDiv.appendChild(
        colorsText
    );


    product.colors.forEach(
        function (color) {

            let dot =
                document.createElement("span");

            dot.className =
                "color-dot";

            dot.style.backgroundColor =
                color;

            colorsDiv.appendChild(dot);

        }
    );


    /*
        Rating
    */

    let ratingDiv =
        document.createElement("div");

    ratingDiv.className =
        "product-rating";


    let ratingText =
        document.createElement("span");

    ratingText.textContent =
        "Rating:";


    let stars =
        document.createElement("span");

    stars.className =
        "stars";


    let fullStars =
        Math.round(product.rating);


    stars.textContent =
        "★".repeat(fullStars);


    ratingDiv.appendChild(
        ratingText
    );

    ratingDiv.appendChild(
        stars
    );


    /*
        Add everything
    */

    details.appendChild(
        priceRow
    );

    details.appendChild(
        colorsDiv
    );

    details.appendChild(
        ratingDiv
    );


    /*
        Add To Cart button
    */

    let addButton =
        document.createElement("button");

    addButton.className =
        "add-btn";

    addButton.textContent =
        "Add To Cart";


    /*
        Check whether product
        is already in cart
    */

    let existingCart =
        JSON.parse(
            localStorage.getItem("cart") || "[]"
        );


    let alreadyAdded =
        existingCart.some(
            function (item) {
                return item.id === product.id;
            }
        );


    if (alreadyAdded) {

        addButton.textContent =
            "Added To Cart";

        addButton.classList.add(
            "added"
        );
    }


    /*
        Add product to cart
    */

    addButton.addEventListener(
        "click",
        function () {

            let currentCart =
                JSON.parse(
                    localStorage.getItem("cart") || "[]"
                );


            /*
                Don't add the same
                product twice.
            */

            let productExists =
                currentCart.some(
                    function (item) {
                        return (
                            item.id ===
                            product.id
                        );
                    }
                );


            if (productExists) {

                alert(
                    "Product is already in your cart."
                );

                return;
            }


            /*
                Add product
            */

            currentCart.push(product);


            /*
                Save cart
            */

            localStorage.setItem(
                "cart",
                JSON.stringify(currentCart)
            );


            /*
                Update badge immediately
            */

            updateCartCount();


            /*
                Change button
            */

            addButton.textContent =
                "Added To Cart";

            addButton.classList.add(
                "added"
            );


            alert(
                "Product added to cart!"
            );

        }
    );


    /*
        Add elements to card
    */

    card.appendChild(image);

    card.appendChild(details);

    card.appendChild(addButton);


    return card;
}


/* ==========================================
   SEARCH
========================================== */

search.addEventListener(
    "input",
    function () {

        searchText =
            search.value
                .toLowerCase()
                .trim();

        applyAllFilters();

    }
);


/* ==========================================
   CATEGORY
========================================== */

categories.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                categories.forEach(
                    function (item) {
                        item.classList.remove(
                            "active"
                        );
                    }
                );


                button.classList.add(
                    "active"
                );


                selectedCategory =
                    button.dataset.category;


                applyAllFilters();

            }
        );

    }
);


/* ==========================================
   COLOR FILTER
========================================== */

colorFilters.forEach(
    function (checkbox) {

        checkbox.addEventListener(
            "change",
            function () {

                selectedColors =
                    Array.from(
                        colorFilters
                    )
                    .filter(
                        function (item) {
                            return item.checked;
                        }
                    )
                    .map(
                        function (item) {
                            return item.value;
                        }
                    );

            }
        );

    }
);


/* ==========================================
   SIZE FILTER
========================================== */

sizeFilters.forEach(
    function (checkbox) {

        checkbox.addEventListener(
            "change",
            function () {

                selectedSizes =
                    Array.from(
                        sizeFilters
                    )
                    .filter(
                        function (item) {
                            return item.checked;
                        }
                    )
                    .map(
                        function (item) {
                            return item.value;
                        }
                    );

            }
        );

    }
);


/* ==========================================
   RATING
========================================== */

rating.addEventListener(
    "input",
    function () {

        let value =
            Number(rating.value);


        if (value === 0) {

            ratingValue.textContent =
                "5";

        } else {

            ratingValue.textContent =
                value;
        }

    }
);


/* ==========================================
   APPLY FILTER
========================================== */

applyFilter.addEventListener(
    "click",
    function () {

        selectedRating =
            Number(rating.value);


        selectedPrice =
            document.querySelector(
                'input[name="price"]:checked'
            )?.value || "";


        applyAllFilters();

    }
);


/* ==========================================
   SORT
========================================== */

sort.addEventListener(
    "change",
    function () {

        selectedSort =
            sort.value;

        displayProducts();

    }
);


/* ==========================================
   FILTER FUNCTION
========================================== */

function applyAllFilters() {

    filteredProducts =
        products.filter(
            function (product) {


                /*
                    Search
                */

                let matchesSearch =
                    product.title
                        .toLowerCase()
                        .includes(searchText);


                if (!matchesSearch) {
                    return false;
                }


                /*
                    Category
                */

                let matchesCategory =
                    selectedCategory === "all" ||
                    product.category ===
                    selectedCategory;


                if (!matchesCategory) {
                    return false;
                }


                /*
                    Colors
                */

                if (
                    selectedColors.length > 0
                ) {

                    let matchesColor =
                        selectedColors.some(
                            function (color) {

                                return product.colors
                                    .map(
                                        function (item) {
                                            return item.toLowerCase();
                                        }
                                    )
                                    .includes(color);

                            }
                        );


                    if (!matchesColor) {
                        return false;
                    }
                }


                /*
                    Sizes
                */

                if (
                    selectedSizes.length > 0
                ) {

                    let matchesSize =
                        selectedSizes.some(
                            function (size) {

                                return product.sizes
                                    .includes(size);

                            }
                        );


                    if (!matchesSize) {
                        return false;
                    }
                }


                /*
                    Rating
                */

                if (
                    selectedRating > 0 &&
                    product.rating < selectedRating
                ) {

                    return false;
                }


                /*
                    Price
                */

                if (selectedPrice !== "") {

                    let price =
                        Number(product.price);


                    if (
                        selectedPrice === "0-50" &&
                        (price < 0 || price > 50)
                    ) {
                        return false;
                    }


                    if (
                        selectedPrice === "50-100" &&
                        (price < 50 || price > 100)
                    ) {
                        return false;
                    }


                    if (
                        selectedPrice === "100-1000" &&
                        price < 100
                    ) {
                        return false;
                    }
                }


                return true;

            }
        );


    displayProducts();
}


/* ==========================================
   CATEGORY VISIBILITY
========================================== */

function updateCategoryVisibility() {

    let mensSection =
        mensProducts.parentElement;

    let womensSection =
        womensProducts.parentElement;

    let jewellerySection =
        jewelleryProducts.parentElement;

    let electronicsSection =
        electronicsProducts.parentElement;


    if (
        selectedCategory === "all"
    ) {

        mensSection.style.display =
            "block";

        womensSection.style.display =
            "block";

        jewellerySection.style.display =
            "block";

        electronicsSection.style.display =
            "block";

        return;
    }


    mensSection.style.display =
        selectedCategory ===
        "men's clothing"
            ? "block"
            : "none";


    womensSection.style.display =
        selectedCategory ===
        "women's clothing"
            ? "block"
            : "none";


    jewellerySection.style.display =
        selectedCategory ===
        "jewelery"
            ? "block"
            : "none";


    electronicsSection.style.display =
        selectedCategory ===
        "electronics"
            ? "block"
            : "none";
}


/* ==========================================
   INITIAL LOAD
========================================== */

updateCartCount();

fetchProducts();