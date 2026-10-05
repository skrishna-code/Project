import { useEffect, useState } from "react";
import CryptoRow from "./components/CryptoRow";
import "./App.css";

function App() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
        );

        const data = await response.json();
        setCoins(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCoins();
  }, []);

  return (
    <div className="app">
      <h1>Cryptocurrency Market</h1>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Coin</th>
              <th>Price</th>
              <th>24h Change</th>
              <th>Market Cap</th>
            </tr>
          </thead>

          <tbody>
            {coins.map((coin) => (
              <CryptoRow key={coin.id} coin={coin} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;