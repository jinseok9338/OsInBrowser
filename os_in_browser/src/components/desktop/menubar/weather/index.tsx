import { onMount } from "solid-js";

const Weather = () => {
  onMount(() => {
    fetch("http://ip-api.com/json/")
      .then((res) => res.json())
      .then((response) => {
        console.log("Country: ", response.city);
        fetch(
          `http://api.weatherapi.com/v1/current.json?key=6c6bd5397d6d4695914131940221207&q=${response.city}&aqi=no`
        )
          .then((res) => res.json())
          .then((response) => console.log(response));
      })
      .catch(() => {
        console.log("Request failed");
      });
  });
};

export default Weather;
