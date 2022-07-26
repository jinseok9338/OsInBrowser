import highVolume from "./icons/high-volume.png";
import blueTooth from "./icons/bluetooth.png";
import wifiSignal from "./icons/wifi-signal.png";
import search from "./icons/search.png";
import microphone from "./icons/microphone.png";
import { createSignal, onCleanup } from "solid-js";
import { ProcessState } from "../../../../types/processDirectory";
import { useProcess } from "../../../../context/processDirectory";
import { For } from "solid-js";
import Tasks from "./tasks";

const Menubar = () => {
  const [time, setTime] = createSignal(new Date(Date.now()).toLocaleString());
  const [state, { shrink }] = useProcess();

  const interval = setInterval(() => {
    let now = new Date(Date.now());

    let dateStringNow = now.toLocaleString();
    setTime(dateStringNow);
  }, 1000);
  onCleanup(() => clearInterval(interval));

  return (
    <div class="menu-bar">
      <div class="leftbar">
        <img
          draggable={false}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Apple_logo_white.svg/1010px-Apple_logo_white.svg.png"
          class="apple-logo"
          width="18"
          height="20"
          alt=""
        />
        <For each={state}>
          {(process, index) => (
            <Tasks
              id={process.id}
              shrink={shrink}
              processName={process.processName}
              iconPath={process.iconPath}
            />
          )}
        </For>
      </div>

      <div class="rightbar">
        <div class="menu-ico">
          <img
            draggable={false}
            src={highVolume}
            width="30"
            height="30"
            alt=""
            class="vol"
          />
        </div>
        <div class="menu-ico">
          <img
            draggable={false}
            src={blueTooth}
            width="30"
            height="30"
            alt=""
            class="bluetooth"
          />
        </div>

        <div class="menu-ico">
          <img
            draggable={false}
            src={wifiSignal}
            width="30"
            height="30"
            alt=""
            class="wifi"
          />
        </div>
        <div class="menu-ico">
          <img
            draggable={false}
            src={search}
            width="30"
            height="30"
            alt=""
            class="search"
          />
        </div>
        <div class="menu-ico">
          <img
            draggable={false}
            src="https://eshop.macsales.com/blog/wp-content/uploads/2021/03/control-center-icon.png"
            width="30"
            height="30"
            alt=""
            class="control-center"
          />
        </div>
        <div class="menu-ico">
          <img
            draggable={false}
            src={microphone}
            width="30"
            height="30"
            alt=""
            class="microphone"
          />
        </div>

        <div class="menu-time">{time}</div>
      </div>
    </div>
  );
};

export default Menubar;
