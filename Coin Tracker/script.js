const API_URL =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

const tableBody = document.getElementById("cryptoTableBody");
const searchInput = document.getElementById("searchInput");
const marketCapBtn = document.getElementById("marketCapBtn");
const percentageBtn = document.getElementById("percentageBtn");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

let cryptoData = [];

function fetchCryptoData() {
return fetch(API_URL)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
       console.log(data);
       return data;
    });
}

 async function loadCryptoData() {
   try{
    cryptoData = await fetchCryptoData();
    console.log(cryptoData);
    loading.style.display = "none";
    renderTable(cryptoData);
   } catch (error) {
    console.error("Error fetching crypto data:", error);
    error.textContent = "Error fetching crypto data. Please try again later.";
    loading.style.display = "none";
   }
 }

 function formatPrice(price) {
    if(price===null || price===undefined){
        return "$0";
    }
    if(price<1){
        return `$${price.toFixed(6)}`;
    }
     return "$" + price.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function formatNumber(number){
      if (number === null || number === undefined) {
        return "$0";
    }

    return "$" + number.toLocaleString("en-US");
}

function renderTable(data) {
    tableBody.innerHTML = "";

    if (data.length === 0) {
        tableBody.innerHTML=`
        <tr>
            <td colspan="6" class="no-result">No data available</td>
        </tr>
        `;
        return;
    }

    data.forEach(coin => {
        const row = document.createElement("tr");
       
        const percentage = coin.price_change_percentage_24h || 0;

        const percentageClass = percentage >= 0 ? "positive" : "negative";

        row.innerHTML=`
        <td>
        <div class="coin-info">

        <img src="${coin.image}" alt="${coin.name}" class="coin-image">

        <span class="coin-name">${coin.name}</span>
        </div>
        </td>

        <td>
        <span class="symbol">${coin.symbol.toUpperCase()}</span>
        </td>

        <td class="price">${formatPrice(coin.current_price)}</td>

        <td class="volume">${formatNumber(coin.total_volume)}</td>

        <td class="market-cap">${formatNumber(coin.market_cap)}</td>

        `;

        tableBody.appendChild(row);
    });
}

searchInput.addEventListener("input", function () {
   searchValue = searchInput.value.toLowerCase().trim();

   const filteredData = cryptoData.filter(coin => {
    const name=coin.name.toLowerCase();
    const symbol=coin.symbol.toLowerCase();
    return name.includes(searchValue) || symbol.includes(searchValue);

   });
   renderTable(filteredData);
});

marketCapBtn.addEventListener("click", function () {
    const sortedData = [...cryptoData].sort((a, b) => b.market_cap - a.market_cap);
    renderTable(sortedData);
});

percentageBtn.addEventListener("click", function () {
    const sortedData = [...cryptoData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    renderTable(sortedData);
});

loadCryptoData();
