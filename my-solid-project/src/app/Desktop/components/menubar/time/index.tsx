import { createEffect, createSignal, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";

const Time = () => {
  const [options, setOptions] = createStore({
    year: "numeric" as "numeric",
    month: "numeric" as "numeric",
    day: "numeric" as "numeric",
    hour: "numeric" as "numeric",
    minute: "numeric" as "numeric",

    hour12: false,
  });
  const [time, setTime] = createSignal(
    new Intl.DateTimeFormat("default", options).format(new Date(Date.now()))
  );

  //because interval is set to 1000 there will be some delay. Maybe I can change the duration
  const interval = setInterval(() => {
    let now = new Date(Date.now());

    let dateStringNow = new Intl.DateTimeFormat("default", options).format(now);
    setTime(dateStringNow);
  }, 1000);
  onCleanup(() => clearInterval(interval));

  return (
    <div
      onClick={() => {
        setOptions((prev) => {
          return {
            ...prev,
            hour12: !prev.hour12,
          };
        });
        setTime(
          new Intl.DateTimeFormat("default", options).format(
            new Date(Date.now())
          )
        );
      }}
      class="menu-time"
    >
      {time()}
    </div>
  );
};

export default Time;
