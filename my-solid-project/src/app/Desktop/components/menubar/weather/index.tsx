import { onMount, createSignal } from "solid-js";

const Weather = () => {
  const [weatherIcon, setWeatherIcon] = createSignal("");
  const [temperature, setTemperature] = createSignal(0);
  const [description, setDescription] = createSignal("");
  const [city, setCity] = createSignal("");

  onMount(() => {
    //to get the city based on the ip
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((response) => {
        setCity(response.city);
        fetch(
          // I need to hide the key in env ... how to ...
          `https://api.weatherapi.com/v1/current.json?key=${"6c6bd5397d6d4695914131940221207"}&q=${
            response.city
          }&aqi=no`
        )
          .then((res) => res.json())
          .then((response) => {
            setWeatherIcon(response.current.condition.icon);
            setTemperature(response.current.temp_c);
            setDescription(response.current.condition.text);
          });
      })
      .catch(() => {
        console.log("Request failed");
      });
  });

  return (
    <div class="weather-container">
      <img class="weather-image" src={weatherIcon()} />
      <span class="weather-text">{`${city()} ${temperature()}°C  ${description()}`}</span>
    </div>
  );
};

export default Weather;
