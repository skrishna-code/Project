// ============================================
// IP ADDRESS TRACKER / POST OFFICE APPLICATION
// ============================================


// ============================================
// GET HTML ELEMENTS
// ============================================

const ipAddress = document.getElementById("ipAddress");
const getInfoBtn = document.getElementById("getInfoBtn");

const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");

const userInfo = document.getElementById("userInfo");

const infoIP = document.getElementById("infoIP");
const infoCity = document.getElementById("infoCity");
const infoOrganisation = document.getElementById("infoOrganisation");
const infoLatitude = document.getElementById("infoLatitude");
const infoRegion = document.getElementById("infoRegion");
const infoHostname = document.getElementById("infoHostname");
const infoLongitude = document.getElementById("infoLongitude");

const locationSection =
    document.getElementById("locationSection");

const map =
    document.getElementById("map");

const moreInfo =
    document.querySelector(".more-info");

const infoTimezone =
    document.getElementById("infoTimezone");

const currentDate =
    document.getElementById("currentDate");

const currentTime =
    document.getElementById("currentTime");

const infoPostal =
    document.getElementById("infoPostal");

const infoMessage =
    document.getElementById("infoMessage");

const postOfficeSection =
    document.getElementById("postOfficeSection");

const searchInput =
    document.getElementById("searchInput");

const postOfficeList =
    document.getElementById("postOfficeList");


// ============================================
// VARIABLES
// ============================================

let userIP = "";

let postOffices = [];

let clockInterval = null;


// ============================================
// PAGE LOAD
// ============================================

window.addEventListener("load", function () {

    getIPAddress();

});


// ============================================
// GET USER IP ADDRESS
// ============================================

async function getIPAddress() {

    try {

        ipAddress.textContent = "Loading...";

        errorMessage.textContent = "";


        const response = await fetch(
            "https://api.ipify.org?format=json"
        );


        if (!response.ok) {

            throw new Error(
                "Unable to retrieve IP address"
            );

        }


        const data = await response.json();


        userIP = data.ip;


        // Display IP
        ipAddress.textContent = userIP;


    } catch (error) {

        console.error(error);

        userIP = "";

        ipAddress.textContent =
            "Unable to get IP";

        errorMessage.textContent =
            "Unable to retrieve your IP address.";

    }

}


// ============================================
// GET STARTED BUTTON
// ============================================

getInfoBtn.addEventListener(
    "click",
    function () {

        getUserInformation();

    }
);


// ============================================
// GET USER INFORMATION
// ============================================

async function getUserInformation() {

    // Check IP
    if (!userIP) {

        errorMessage.textContent =
            "IP address is not available.";

        return;

    }


    // Clear error
    errorMessage.textContent = "";


    // Loading
    loading.style.display = "block";

    getInfoBtn.disabled = true;


    try {

        // ====================================
        // IPINFO API
        // ====================================

        const url =
            `https://ipinfo.io/${userIP}/geo`;


        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "IPInfo request failed"
            );

        }


        const data =
            await response.json();


        console.log(
            "IPInfo Data:",
            data
        );


        // Check API error
        if (data.error) {

            throw new Error(
                "IPInfo returned an error"
            );

        }


        // ====================================
        // DISPLAY INFORMATION
        // ====================================

        displayUserInformation(data);


        // ====================================
        // DISPLAY MAP
        // ====================================

        displayMap(data);


        // ====================================
        // DISPLAY TIME
        // ====================================

        displayCurrentTime(
            data.timezone
        );


        // ====================================
        // GET POST OFFICES
        // ====================================

        getPostOffices(
            data.postal
        );


    } catch (error) {

        console.error(error);

        errorMessage.textContent =
            "Unable to retrieve user information. Please try again.";

    } finally {

        loading.style.display = "none";

        getInfoBtn.disabled = false;

    }

}


// ============================================
// DISPLAY USER INFORMATION
// ============================================

function displayUserInformation(data) {

    // ----------------------------------------
    // IP
    // ----------------------------------------

    infoIP.textContent =
        data.ip || userIP || "-";


    // ----------------------------------------
    // CITY
    // ----------------------------------------

    infoCity.textContent =
        data.city || "-";


    // ----------------------------------------
    // ORGANISATION
    // ----------------------------------------

    infoOrganisation.textContent =
        data.org || "-";


    // ----------------------------------------
    // REGION
    // ----------------------------------------

    infoRegion.textContent =
        data.region || "-";


    // ----------------------------------------
    // HOSTNAME
    // ----------------------------------------

    infoHostname.textContent =
        data.hostname || "-";


    // ----------------------------------------
    // LATITUDE + LONGITUDE
    // ----------------------------------------

    if (data.loc) {

        const coordinates =
            data.loc.split(",");


        infoLatitude.textContent =
            coordinates[0] || "-";


        infoLongitude.textContent =
            coordinates[1] || "-";

    } else {

        infoLatitude.textContent = "-";

        infoLongitude.textContent = "-";

    }


    // ----------------------------------------
    // TIMEZONE
    // ----------------------------------------

    infoTimezone.textContent =
        data.timezone || "-";


    // ----------------------------------------
    // PINCODE
    // ----------------------------------------

    infoPostal.textContent =
        data.postal || "-";


    // ----------------------------------------
    // SHOW USER INFORMATION
    // ----------------------------------------

    userInfo.style.display = "grid";


    // ----------------------------------------
    // SHOW MORE INFORMATION
    // ----------------------------------------

    moreInfo.style.display = "block";

}


// ============================================
// GOOGLE MAP
// ============================================

function displayMap(data) {

    if (!data.loc) {

        throw new Error(
            "Location coordinates not available"
        );

    }


    // IPInfo format:
    //
    // "18.5204,73.8567"

    const coordinates =
        data.loc.split(",");


    const latitude =
        coordinates[0];

    const longitude =
        coordinates[1];


    if (!latitude || !longitude) {

        throw new Error(
            "Invalid latitude or longitude"
        );

    }


    // ========================================
    // GOOGLE MAP IFRAME
    // ========================================

    map.src =
        `https://www.google.com/maps?q=${latitude},${longitude}&z=14&output=embed`;


    // Show location section
    locationSection.style.display =
        "block";

}


// ============================================
// CURRENT TIME
// ============================================

function displayCurrentTime(timezone) {

    if (!timezone) {

        currentTime.textContent =
            "Time unavailable";

        currentDate.textContent =
            "Time zone unavailable";

        return;

    }


    // Clear previous timer
    if (clockInterval) {

        clearInterval(clockInterval);

    }


    function updateClock() {

        const now =
            new Date();


        try {

            // --------------------------------
            // TIME
            // --------------------------------

            const time =
                now.toLocaleTimeString(
                    "en-US",
                    {
                        timeZone: timezone,

                        hour: "2-digit",

                        minute: "2-digit",

                        second: "2-digit"
                    }
                );


            // --------------------------------
            // DATE
            // --------------------------------

            const date =
                now.toLocaleDateString(
                    "en-US",
                    {
                        timeZone: timezone,

                        weekday: "long",

                        year: "numeric",

                        month: "long",

                        day: "numeric"
                    }
                );


            currentTime.textContent =
                time;


            currentDate.textContent =
                date;


        } catch (error) {

            console.error(error);

            currentTime.textContent =
                "Time unavailable";

            currentDate.textContent =
                "Date unavailable";

        }

    }


    // Run immediately
    updateClock();


    // Update every second
    clockInterval =
        setInterval(
            updateClock,
            1000
        );

}


// ============================================
// GET POST OFFICES
// ============================================

async function getPostOffices(pincode) {

    // Clear old cards
    postOfficeList.innerHTML = "";


    // Show section
    postOfficeSection.style.display =
        "block";


    // Check pincode
    if (!pincode) {

        infoMessage.textContent =
            "Pincode not available";


        postOfficeList.innerHTML = `
            <div class="no-results">
                Pincode not available.
            </div>
        `;

        return;

    }


    try {

        // ====================================
        // POSTAL PINCODE API
        // ====================================

        const url =
            `https://api.postalpincode.in/pincode/${pincode}`;


        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "Postal API request failed"
            );

        }


        const data =
            await response.json();


        console.log(
            "Postal API Data:",
            data
        );


        // ====================================
        // CHECK RESPONSE
        // ====================================

        if (
            !data ||
            data.length === 0 ||
            data[0].Status !== "Success" ||
            !data[0].PostOffice
        ) {

            throw new Error(
                "No post offices found"
            );

        }


        // Store post offices
        postOffices =
            data[0].PostOffice;


        // Message
        infoMessage.textContent =
            `${postOffices.length} post office(s) found`;


        // Display
        displayPostOffices(
            postOffices
        );


    } catch (error) {

        console.error(error);


        infoMessage.textContent =
            "No post offices found";


        postOfficeList.innerHTML = `
            <div class="no-results">
                No post offices found.
            </div>
        `;

    }

}


// ============================================
// DISPLAY POST OFFICES
// ============================================

function displayPostOffices(list) {

    postOfficeList.innerHTML = "";


    if (
        !list ||
        list.length === 0
    ) {

        postOfficeList.innerHTML = `
            <div class="no-results">
                No post offices found.
            </div>
        `;

        return;

    }


    list.forEach(function (office) {

        const card =
            document.createElement("div");


        card.className =
            "post-office-card";


        card.innerHTML = `

            <h3>
                ${office.Name || "N/A"}
            </h3>

            <p>
                Branch Type:
                ${office.BranchType || "N/A"}
            </p>

            <p>
                Delivery Status:
                ${office.DeliveryStatus || "N/A"}
            </p>

            <p>
                District:
                ${office.District || "N/A"}
            </p>

            <p>
                Division:
                ${office.Division || "N/A"}
            </p>

        `;


        postOfficeList.appendChild(card);

    });

}


// ============================================
// SEARCH POST OFFICES
// ============================================

searchInput.addEventListener(
    "input",
    function () {

        const searchText =
            searchInput.value
                .trim()
                .toLowerCase();


        // ====================================
        // FILTER NAME + BRANCH TYPE
        // ====================================

        const filtered =
            postOffices.filter(
                function (office) {

                    const name =
                        (
                            office.Name || ""
                        ).toLowerCase();


                    const branchType =
                        (
                            office.BranchType || ""
                        ).toLowerCase();


                    return (
                        name.includes(searchText) ||
                        branchType.includes(searchText)
                    );

                }
            );


        displayPostOffices(filtered);

    }
);