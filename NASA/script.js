const API_KEY = "KkMegSwZjAyfSS0nL6vSuaiqARYzR2AI3YXs2dwL";

const form = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const currentImageContainer = document.getElementById("current-image-container");
const searchHistory = document.getElementById("search-history");

const today = new Date().toISOString().split("T")[0];

// Don't allow future dates
searchInput.max = today;


// Fetch APOD from NASA
async function fetchAPOD(date) {
    const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error?.message || `NASA API Error: ${response.status}`);
    }

    return data;
}


// Get today's picture
async function getCurrentImageOfTheDay() {
    showLoading();

    let date = new Date();

    // Try today, then previous days if today's APOD is unavailable
    for (let i = 0; i < 7; i++) {
        const dateString = date.toISOString().split("T")[0];

        try {
            const data = await fetchAPOD(dateString);

            displayImage(data);
            return;

        } catch (error) {

            // If API key is invalid, don't keep trying
            if (error.message.toLowerCase().includes("api key")) {
                showError("Invalid NASA API key. Please check your API key.");
                return;
            }

            date.setUTCDate(date.getUTCDate() - 1);
        }
    }

    showError("Unable to load NASA Picture of the Day.");
}


// Get picture for selected date
async function getImageOfTheDay(date) {
    showLoading();

    try {
        const data = await fetchAPOD(date);

        displayImage(data);

        // Save selected date
        saveSearch(date);

        // Update history
        addSearchToHistory();

    } catch (error) {
        console.error(error);
        showError(error.message);
    }
}


// Display NASA image/video
function displayImage(data) {

    currentImageContainer.innerHTML = "";

    const title = document.createElement("h2");
    title.textContent = data.title;

    const date = document.createElement("p");
    date.className = "date";
    date.textContent = data.date;

    if (data.media_type === "image") {

        const image = document.createElement("img");
        image.src = data.url;
        image.alt = data.title;

        currentImageContainer.appendChild(title);
        currentImageContainer.appendChild(date);
        currentImageContainer.appendChild(image);

    } else if (data.media_type === "video") {

        const iframe = document.createElement("iframe");

        iframe.src = data.url;
        iframe.width = "100%";
        iframe.height = "500";
        iframe.frameBorder = "0";
        iframe.allowFullscreen = true;

        currentImageContainer.appendChild(title);
        currentImageContainer.appendChild(date);
        currentImageContainer.appendChild(iframe);
    }

    const explanation = document.createElement("p");
    explanation.className = "explanation";
    explanation.textContent = data.explanation;

    currentImageContainer.appendChild(explanation);
}


// Save search date to localStorage
function saveSearch(date) {

    let searches = JSON.parse(localStorage.getItem("searches")) || [];

    // Avoid duplicate dates
    if (!searches.includes(date)) {
        searches.push(date);
    }

    localStorage.setItem("searches", JSON.stringify(searches));
}


// Display search history
function addSearchToHistory() {

    searchHistory.innerHTML = "";

    const searches = JSON.parse(localStorage.getItem("searches")) || [];

    searches.reverse().forEach(date => {

        const listItem = document.createElement("li");

        const button = document.createElement("button");

        button.textContent = date;

        button.addEventListener("click", function () {
            getImageOfTheDayFromHistory(date);
        });

        listItem.appendChild(button);
        searchHistory.appendChild(listItem);
    });
}


// Load image from history
async function getImageOfTheDayFromHistory(date) {

    showLoading();

    try {
        const data = await fetchAPOD(date);
        displayImage(data);

    } catch (error) {
        console.error(error);
        showError(error.message);
    }
}


// Loading message
function showLoading() {

    currentImageContainer.innerHTML = `
        <p class="loading">Loading NASA Picture of the Day...</p>
    `;
}


// Error message
function showError(message) {

    currentImageContainer.innerHTML = `
        <p class="error">${message}</p>
    `;
}


// Form submit
form.addEventListener("submit", function (event) {

    event.preventDefault();

    const selectedDate = searchInput.value;

    if (selectedDate) {
        getImageOfTheDay(selectedDate);
    }
});


// Page load
document.addEventListener("DOMContentLoaded", function () {

    getCurrentImageOfTheDay();

    addSearchToHistory();
});