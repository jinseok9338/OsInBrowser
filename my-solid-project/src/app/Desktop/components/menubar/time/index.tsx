import { createSignal, onCleanup } from "solid-js";

const Time = () => {
  const [time, setTime] = createSignal(new Date(Date.now()).toLocaleString());

  const interval = setInterval(() => {
    let now = new Date(Date.now());

    let dateStringNow = now.toLocaleString();
    setTime(dateStringNow);
  }, 1000);
  onCleanup(() => clearInterval(interval));

  return <div class="menu-time">{time()}</div>;
};

export default Time;
