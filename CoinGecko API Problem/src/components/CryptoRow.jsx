function CryptoRow({ coin }) {
  return (
    <tr>
      <td>{coin.market_cap_rank}</td>

      <td className="coin-name">
        <img src={coin.image} alt={coin.name} />
        <div>
          <strong>{coin.name}</strong>
          <span>{coin.symbol.toUpperCase()}</span>
        </div>
      </td>

      <td>
        ${coin.current_price.toLocaleString()}
      </td>

      <td
        className={
          coin.price_change_percentage_24h >= 0
            ? "positive"
            : "negative"
        }
      >
        {coin.price_change_percentage_24h?.toFixed(2)}%
      </td>

      <td>
        ${coin.market_cap.toLocaleString()}
      </td>
    </tr>
  );
}

export default CryptoRow;