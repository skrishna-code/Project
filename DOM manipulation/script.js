let count = 1;

const countElement = document.getElementById("count");
const errorElement = document.getElementById("error");

const decrementButton = document.getElementById("decrement");
const incrementButton = document.getElementById("increment");
const clearButton = document.getElementById("clear");


incrementButton.addEventListener("click", function () {
    count++;

    countElement.innerText = count;
    errorElement.innerText = "";

    clearButton.style.display = "inline-block";
});
decrementButton.addEventListener("click", function () {

    if (count === 0) {
        errorElement.innerText = "Error : Cannot go below 0";
        return;
    }

    count--;

    countElement.innerText = count;
    errorElement.innerText = "";

    if (count === 0) {
        clearButton.style.display = "none";
    }
});
clearButton.addEventListener("click", function () {

    count = 0;

    countElement.innerText = count;
    errorElement.innerText = "";

    clearButton.style.display = "none";
});