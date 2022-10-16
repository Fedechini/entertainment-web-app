import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [res, setRes] = useState("");

  const callAPI = async () => {
    try {
      const response = await fetch("http://127.0.0.1:9000/api/movies");
      const data = await response.json();
      setRes(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callAPI();
  }, []);

  return <h1>{res.data}</h1>;
}

export default App;
