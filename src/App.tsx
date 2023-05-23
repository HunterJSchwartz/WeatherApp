import "./styles/App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [condition, setCondition] = useState("");

  useEffect(() => {
    if (condition !== "") {
    }
  }, [condition]);

  async function Testing() {
    const baseURL = "http://api.weatherapi.com/v1/current.json?";
    const params = new URLSearchParams({
      key: "09cedaf909184f7e9cb51126232305",
      q: "austin",
    });
    try {
      fetch(baseURL + params)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.current);
          var day = data.current.is_day == 1 ? "day/" : "night/";
          setCondition(
            "./images/weather/" +
              day +
              data.current.condition.icon.split("/").at(-1).split(".png")[0] +
              ".svg"
          );
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <header className="header">
        <h1 className="header-text">Weather App</h1>
      </header>
      <main className="hero-container">
        <p>Testing</p>
        <button onClick={Testing}>Testing</button>
        <img src={condition} />
      </main>
    </>
  );
}

export default App;
