import { useState } from "react";
import "./App.css";

function App() {
  const [pincode, setPincode] = useState("");
  const [postOffices, setPostOffices] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchedPincode, setSearchedPincode] = useState("");

  const handleLookup = async (e) => {
    e.preventDefault();

    setError("");
    setPostOffices([]);
    setFilter("");

    if (!/^\d{6}$/.test(pincode)) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      if (
        !data ||
        !data[0] ||
        data[0].Status !== "Success" ||
        !data[0].PostOffice
      ) {
        setError(
          data?.[0]?.Message ||
            "Couldn't find postal data for this pincode."
        );
        return;
      }

      setPostOffices(data[0].PostOffice);
      setSearchedPincode(pincode);
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredPostOffices = postOffices.filter((office) =>
    office.Name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="app">

      {/* Background decoration */}
      <div className="glow glow-one"></div>
      <div className="glow glow-two"></div>

      <main className="container">

        {/* Header */}
        <header className="top-header">
          <div className="brand">
            <div className="brand-icon">P</div>

            <div>
              <h2>Pincode Finder</h2>
              <p>Indian Postal Directory</p>
            </div>
          </div>

          <div className="api-status">
            <span></span>
            API Online
          </div>
        </header>

        {/* Search Card */}
        <section className="search-card">

          <div className="hero-content">
            <div className="location-icon">⌖</div>

            <div>
              <p className="eyebrow">POSTAL LOOKUP</p>

              <h1>
                Find your
                <span> postal information.</span>
              </h1>

              <p className="subtitle">
                Enter a 6-digit Indian pincode to discover
                post office details instantly.
              </p>
            </div>
          </div>

          <form onSubmit={handleLookup} className="search-form">

            <div className="input-wrapper">

              <label htmlFor="pincode">
                Enter Pincode
              </label>

              <div className="input-box">
                <span className="input-icon">⌖</span>

                <input
                  id="pincode"
                  type="text"
                  placeholder="e.g. 110048"
                  value={pincode}
                  maxLength={6}
                  onChange={(e) => {
                    const value =
                      e.target.value.replace(/\D/g, "");

                    setPincode(value);
                  }}
                />

                <span className="digit-count">
                  {pincode.length}/6
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="lookup-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="button-loader"></span>
                  Searching...
                </>
              ) : (
                <>
                  Lookup
                  <span>→</span>
                </>
              )}
            </button>

          </form>

          {error && (
            <div className="error-message">
              <span>!</span>
              {error}
            </div>
          )}

        </section>

        {/* Results */}
        {!loading && postOffices.length > 0 && (
          <section className="results-section">

            <div className="results-header">

              <div>
                <p className="section-label">
                  SEARCH RESULTS
                </p>

                <h2>
                  Pincode{" "}
                  <span>{searchedPincode}</span>
                </h2>

                <p className="result-count">
                  {postOffices.length} post offices found
                </p>
              </div>

              <div className="pincode-badge">
                {searchedPincode}
              </div>

            </div>

            {/* Filter */}
            <div className="filter-box">

              <span>⌕</span>

              <input
                type="text"
                placeholder="Filter by post office name..."
                value={filter}
                onChange={(e) =>
                  setFilter(e.target.value)
                }
              />

              {filter && (
                <button
                  onClick={() => setFilter("")}
                  type="button"
                >
                  ×
                </button>
              )}

            </div>

            {/* Empty filtered results */}
            {filteredPostOffices.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">⌕</div>

                <h3>No results found</h3>

                <p>
                  Couldn't find the postal data
                  you're looking for.
                </p>
              </div>
            ) : (
              <div className="cards">

                {filteredPostOffices.map(
                  (office, index) => (
                    <div
                      className="postal-card"
                      key={index}
                    >

                      <div className="card-top">
                        <div className="office-icon">
                          {office.Name.charAt(0)}
                        </div>

                        <div>
                          <h3>{office.Name}</h3>

                          <span className="branch-type">
                            {office.BranchType}
                          </span>
                        </div>
                      </div>

                      <div className="card-details">

                        <div>
                          <small>Delivery Status</small>
                          <p>
                            <span className="status-dot"></span>
                            {office.DeliveryStatus}
                          </p>
                        </div>

                        <div>
                          <small>District</small>
                          <p>{office.District}</p>
                        </div>

                        <div>
                          <small>Division</small>
                          <p>{office.Division}</p>
                        </div>

                        <div>
                          <small>State</small>
                          <p>{office.State}</p>
                        </div>

                      </div>

                    </div>
                  )
                )}

              </div>
            )}

          </section>
        )}

        {/* Initial state */}
        {!loading && postOffices.length === 0 && !error && (
          <section className="welcome-card">

            <div className="welcome-icon">
              ⌖
            </div>

            <h2>Ready to search</h2>

            <p>
              Enter a pincode above to discover
              nearby postal offices.
            </p>

          </section>
        )}

        <footer>
          <p>
            Pincode Finder · Powered by Indian Postal
            Pincode API
          </p>
        </footer>

      </main>
    </div>
  );
}

export default App;