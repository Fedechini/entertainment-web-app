import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const [shows, setShows] = useState([]);
  const [error, setError] = useState("");

  const callAPI = async () => {
    try {
      const response = await fetch("http://127.0.0.1:9000/api/movies");
      const data = await response.json();
      if (data.status === "success") setShows(data);
      if (data.status === "fail") setError(data.message);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callAPI();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
    </Routes>
  );
}

export default App;
