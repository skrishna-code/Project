import React from "react";

function GenreFilter({ genres }) {
  const handleGenreClick = (genre) => {
    console.log(`Filtering by ${genre}`);
  };

  return (
    <div className="filter-container">
      <h2>Filter by Genre</h2>

      <div className="genre-buttons">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => handleGenreClick(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GenreFilter;