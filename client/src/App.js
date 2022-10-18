import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [show, setShow] = useState("");

  const callAPI = async () => {
    try {
      const response = await fetch("http://127.0.0.1:9000/api/movies");
      const data = await response.json();
      setShow(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callAPI();
  }, []);

  return (
    <div>
      {show.movies.map((show) => (
        <img src={show.thumbnail.regular.small} alt={show.title} />
      ))}
    </div>
  );
}

export default App;
