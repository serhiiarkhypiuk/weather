import { useEffect, useState } from "react";
import "./index.css";
import api from "./services/fetch";
import SearchForm from "./Components/SearchForm";
import Loader from "./Components/Loader";
import ErrorView from "./Components/Error";
import Button from "./Components/Button";

function App() {
  const [cityName, setCityName] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [weatherStatus, setWeatherStatus] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [temp, setTemp] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle");
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [className, setClassName] = useState("");

  useEffect(() => {
    document.title = "Weather widget";
  }, []);

  useEffect(() => {
    if (cityName !== "") {
      setStatus("pending");
    }
    if (!cityName) {
      return;
    }
    fetchWeather(cityName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityName]);

  useEffect(() => {
    if (status === "resolved") {
      setInterval(() => {
        setIsDisplayed(true);
      }, 1750);
      setClassName("confirm");
    } else {
      setIsDisplayed(false);
    }
  }, [status]);

  const fetchWeather = () => {
    setStatus("pending");

    api
      .getWeather(cityName)
      .then((data) => {
        setDescription(data.weather[0].description);
        setTemp(Math.round(data.main.temp));
        setFeelsLike(Math.round(data.main.feels_like));
        setWeatherStatus(data.weather[0].main);
        setWeatherIcon(
          `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
        );
        setLocation(data.name);
        setStatus("resolved");
      })
      .catch((error) => {
        setError(error);
        setStatus("rejected");
      });
  };

  const handleFormSubmit = (cityName) => {
    setCityName(cityName);
  };

  return (
    <div className="wrapper">
      {status === "idle" && <SearchForm onSubmit={handleFormSubmit} />}

      {status === "pending" && <Loader />}

      {status === "resolved" && (
        <div className="weather">
          <div className="weather__status">
            <img title={description} src={weatherIcon} alt={weatherStatus} />
            <span> in {location}</span>
          </div>
          <div className="weather__temp">
            Temperature is {temp}&#8451; and it feels like {feelsLike}&#8451;
          </div>
        </div>
      )}

      {status === "resolved" && isDisplayed && (
        <Button
          className={className}
          btnText="Search another city"
          onClick={() => setStatus("idle")}
        />
      )}

      {status === "rejected" && <ErrorView message={error.message} />}
    </div>
  );
}

export default App;
