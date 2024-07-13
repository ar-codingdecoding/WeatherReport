import { useState } from "react";
import "./Weather.css";
import cold from "../../assets/cold.jpg";
import thunder from "../../assets/thunder.jpg";
import mist from "../../assets/mist.jpg";
import drizzle from "../../assets/drizzle.jpg";
import rainy from "../../assets/rainy.jpg";
import sunny from "../../assets/sunny.jpg";
import clouds from "../../assets/clouds.jpg";
import neutral from "../../assets/neutral.jpg";

const Weather = () => {
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [dateToday, setDateToday] = useState(date);
  const [appBackImg, setappBackImg] = useState(neutral);

  const api = {
    url: "https://api.openweathermap.org/data/2.5/",
    key: "5394fb3a5a94fa7361704e60021ec833",
  };
  const iconURL = "http://openweathermap.org/img/w/";

  const getInput = (e) => {
    setInput(e.target.value);
  };

  const getWeatherData = (e) => {
    if (e.key === "Enter" && input === "") {
      setErrorMsg("Input cannot be Empty");
      setError(true);
    }
    if (e.key === "Enter" && input !== "") {
      setIsLoading(true);
      setError(true);
      fetch(`${api.url}weather?q=${input}&units=metric&APPID=${api.key}`)
        .then((res) => {
          if (!res.ok) {
            throw Error("Failed to Fetch Data");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          console.log(data.weather[0].main);
          setWeather(data);
          setInput("");
          setError(false);
          setIsLoading(false);
          if (data.weather[0].main === "Thunderstorm") setappBackImg(thunder);
          else if (data.weather[0].main === "Drizzle") setappBackImg(drizzle);
          else if (data.weather[0].main === "Rain") setappBackImg(rainy);
          else if (data.weather[0].main === "Clouds") setappBackImg(clouds);
          else if (data.weather[0].main === "Mist" || "Haze")
            setappBackImg(mist);
          else if (data.weather[0].main === "Snow") setappBackImg(cold);
          else if (data.weather[0].main === "Clear") setappBackImg(sunny);
          else setappBackImg(neutral);
        })
        .catch((err) => {
          console.log(err.message);
          setError(true);
          setErrorMsg(err.message);
          setIsLoading(false);
        });
    }
  };

  return (
    <section className="--100vh --center-all">
      <div
        className="container weather --flex-center"
        style={{ backgroundImage: `url(${appBackImg})` }}
      >
        <p className="dateline">{dateToday}</p>
        <div className="weather-app --text-light">
          <h1>SkySensor App</h1>
          <div className="--form-control --my2">
            <input
              onChange={getInput}
              value={input}
              onKeyPress={getWeatherData}
              type="text"
              placeholder="Search city name"
            />
          </div>
          {error ? (
            <p className={errorMsg !== "" ? "error" : ""}>{errorMsg}</p>
          ) : (
            <div className="result --card --my2">
              <h2>
                {weather.name}, {weather.sys.country}
              </h2>
              <div className="icon">
                <img
                  src={iconURL + weather.weather[0].icon + ".png"}
                  alt={weather.weather[0].main}
                />
              </div>
              <p>Temp: {Math.round(weather.main.temp)} C</p>
              <p>Weather: {weather.weather[0].main}</p>
              <p>
                Temp Range: {Math.round(weather.main.temp_min)} C /{" "}
                {Math.round(weather.main.temp_max)} C
              </p>
            </div>
          )}
          {isLoading && <h3>Loading...</h3>}
        </div>
      </div>

      {/* Adding delete button */}
    </section>
  );
};

export default Weather;
