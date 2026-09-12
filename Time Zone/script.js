// ============================================
// TIMEZONE API PROJECT
// ============================================

// Your Geoapify API Key
const API_KEY = "2c87c7650bae4033a92c5803a979cc5e";


// ============================================
// HTML ELEMENTS
// ============================================

// Current timezone
const currentTimezone = document.getElementById("currentTimezone");
const currentLat = document.getElementById("currentLat");
const currentLong = document.getElementById("currentLong");
const currentOffsetSTD = document.getElementById("currentOffsetSTD");
const currentOffsetSTDSeconds = document.getElementById("currentOffsetSTDSeconds");
const currentOffsetDST = document.getElementById("currentOffsetDST");
const currentOffsetDSTSeconds = document.getElementById("currentOffsetDSTSeconds");
const currentCountry = document.getElementById("currentCountry");
const currentPostcode = document.getElementById("currentPostcode");
const currentCity = document.getElementById("currentCity");


// Errors
const locationError = document.getElementById("locationError");
const addressError = document.getElementById("addressError");


// Address
const addressInput = document.getElementById("addressInput");
const submitBtn = document.getElementById("submitBtn");


// Result
const resultSection = document.getElementById("resultSection");
const resultTimezone = document.getElementById("resultTimezone");
const resultLat = document.getElementById("resultLat");
const resultLong = document.getElementById("resultLong");
const resultOffsetSTD = document.getElementById("resultOffsetSTD");
const resultOffsetSTDSeconds = document.getElementById("resultOffsetSTDSeconds");
const resultOffsetDST = document.getElementById("resultOffsetDST");
const resultOffsetDSTSeconds = document.getElementById("resultOffsetDSTSeconds");
const resultCountry = document.getElementById("resultCountry");
const resultPostcode = document.getElementById("resultPostcode");
const resultCity = document.getElementById("resultCity");


// ============================================
// PAGE LOAD
// ============================================

window.addEventListener("load", function () {
    getCurrentLocation();
});


// ============================================
// GET USER CURRENT LOCATION
// ============================================

function getCurrentLocation() {

    locationError.textContent = "";

    if (!navigator.geolocation) {

        currentTimezone.textContent = "Not available";

        locationError.textContent =
            "Geolocation is not supported by your browser.";

        return;
    }

    currentTimezone.textContent = "Loading...";


    navigator.geolocation.getCurrentPosition(

        function (position) {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;


            currentLat.textContent =
                latitude.toFixed(6);

            currentLong.textContent =
                longitude.toFixed(6);


            getCurrentTimezone(
                latitude,
                longitude
            );
        },


        function (error) {

            currentTimezone.textContent =
                "Not available";


            if (error.code === 1) {

                locationError.textContent =
                    "Please allow location access.";

            } else if (error.code === 2) {

                locationError.textContent =
                    "Unable to determine your location.";

            } else if (error.code === 3) {

                locationError.textContent =
                    "Location request timed out.";

            } else {

                locationError.textContent =
                    "Unable to get your location.";
            }
        },


        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}


// ============================================
// CURRENT TIMEZONE FROM LATITUDE & LONGITUDE
// ============================================

async function getCurrentTimezone(latitude, longitude) {

    try {

        const url =
            `https://api.geoapify.com/v1/geocode/reverse` +
            `?lat=${latitude}` +
            `&lon=${longitude}` +
            `&format=json` +
            `&limit=1` +
            `&apiKey=${API_KEY}`;


        const response = await fetch(url);


        if (!response.ok) {

            throw new Error("API request failed");
        }


        const data = await response.json();


        console.log(
            "Current Location Data:",
            data
        );


        if (
            !data.results ||
            data.results.length === 0
        ) {

            throw new Error(
                "Timezone information not found"
            );
        }


        const result = data.results[0];


        displayCurrentTimezone(result);

    }

    catch (error) {

        console.error(error);

        currentTimezone.textContent =
            "Timezone not found";

        locationError.textContent =
            "Unable to retrieve timezone information.";
    }
}


// ============================================
// DISPLAY CURRENT TIMEZONE
// ============================================

function displayCurrentTimezone(result) {

    const timezone =
        result.timezone || {};


    currentTimezone.textContent =
        timezone.name || "Not available";


    currentLat.textContent =
        result.lat ?? "Not available";


    currentLong.textContent =
        result.lon ?? "Not available";


    currentOffsetSTD.textContent =
        timezone.offset_STD || "Not available";


    currentOffsetSTDSeconds.textContent =
        timezone.offset_STD_seconds ?? "Not available";


    currentOffsetDST.textContent =
        timezone.offset_DST || "Not available";


    currentOffsetDSTSeconds.textContent =
        timezone.offset_DST_seconds ?? "Not available";


    currentCountry.textContent =
        result.country || "Not available";


    currentPostcode.textContent =
        result.postcode || "Not available";


    currentCity.textContent =
        result.city ||
        result.town ||
        result.village ||
        result.county ||
        "Not available";
}


// ============================================
// SUBMIT BUTTON
// ============================================

submitBtn.addEventListener("click", function () {

    searchAddress();

});


// ============================================
// ENTER KEY
// ============================================

addressInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        searchAddress();

    }

});


// ============================================
// SEARCH ADDRESS
// ============================================

async function searchAddress() {

    const address =
        addressInput.value.trim();


    // Clear previous error
    addressError.textContent = "";


    // Hide previous result
    resultSection.style.display = "none";


    // ========================================
    // VALIDATE ADDRESS
    // ========================================

    if (address === "") {

        addressError.textContent =
            "Please enter an address!";

        return;
    }


    // ========================================
    // LOADING
    // ========================================

    submitBtn.disabled = true;

    submitBtn.textContent =
        "Loading...";


    try {

        // ====================================
        // GEOCODING API
        // ====================================

        const params = new URLSearchParams({

            text: address,

            format: "json",

            limit: "1",

            apiKey: API_KEY
        });


        const url =
            `https://api.geoapify.com/v1/geocode/search?${params}`;


        console.log(
            "Address API URL:",
            url
        );


        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "Geocoding API failed"
            );
        }


        const data =
            await response.json();


        console.log(
            "Address Response:",
            data
        );


        // ====================================
        // CHECK RESULT
        // ====================================

        if (
            !data.results ||
            data.results.length === 0
        ) {

            throw new Error(
                "Address not found"
            );
        }


        // First result
        const result =
            data.results[0];


        // ====================================
        // DISPLAY RESULT
        // ====================================

        displayAddressResult(result);

    }

    catch (error) {

        console.error(error);


        addressError.textContent =
            "Timezone could not be found!";


        resultSection.style.display =
            "none";
    }


    finally {

        submitBtn.disabled = false;

        submitBtn.textContent =
            "Submit";
    }
}


// ============================================
// DISPLAY ADDRESS RESULT
// ============================================

function displayAddressResult(result) {

    const timezone =
        result.timezone || {};


    // Timezone
    resultTimezone.textContent =
        timezone.name || "Not available";


    // Latitude
    resultLat.textContent =
        result.lat ?? "Not available";


    // Longitude
    resultLong.textContent =
        result.lon ?? "Not available";


    // Standard offset
    resultOffsetSTD.textContent =
        timezone.offset_STD || "Not available";


    // Standard offset seconds
    resultOffsetSTDSeconds.textContent =
        timezone.offset_STD_seconds ?? "Not available";


    // DST offset
    resultOffsetDST.textContent =
        timezone.offset_DST || "Not available";


    // DST offset seconds
    resultOffsetDSTSeconds.textContent =
        timezone.offset_DST_seconds ?? "Not available";


    // Country
    resultCountry.textContent =
        result.country || "Not available";


    // Postcode
    resultPostcode.textContent =
        result.postcode || "Not available";


    // City
    resultCity.textContent =
        result.city ||
        result.town ||
        result.village ||
        result.county ||
        "Not available";


    // Show result
    resultSection.style.display =
        "block";
}