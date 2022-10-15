import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [res, setRes] = useState("");

  const callAPI = async () => {
    try {
      const response = await fetch("http://localhost:9000/testAPI");
      const data = await response.text();
      setRes(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callAPI();
    console.log(res);
  }, []);

  return <h1>{res}</h1>;
}

export default App;
