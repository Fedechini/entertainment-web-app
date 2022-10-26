import React from "react";

function Trending({ shows }) {
  console.log(shows);
  return (
    <div className="trending__container">
      {shows.movies
        ?.filter((show) => show.isTrending === true)
        .map((show, i) => (
          <div
            className="trending__show"
            key={i}
            style={{
              backgroundImage: `url("https://via.placeholder.com/500")`,
            }}
          ></div>
        ))}
    </div>
  );
}

export default Trending;
