import React from "react";
import Navigation from "../components/Navigation";
import SearchBar from "../components/SearchBar";
import Trending from "../components/Trending";

function Home({ shows }) {
  return (
    <main className="app__container">
      <div className="nav__container">
        <Navigation />
      </div>
      <div className="content__container">
        <SearchBar />
        <Trending shows={shows} />
      </div>
    </main>
  );
}

export default Home;
