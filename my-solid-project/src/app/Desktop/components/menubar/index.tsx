import highVolume from "./icons/high-volume.png";
import blueTooth from "./icons/bluetooth.png";
import wifiSignal from "./icons/wifi-signal.png";
import search from "./icons/search.png";
import microphone from "./icons/microphone.png";

import { useProcess } from "../../../../context/processDirectory";
import { For } from "solid-js";
import Tasks from "./tasks";
import Weather from "./weather";
import Time from "./time";

const Menubar = () => {
  const [state, { shrink }] = useProcess();

  return (
    <div class="menu-bar">
      <div class="leftbar">
        <img
          draggable={false}
          src="https://t1.daumcdn.net/cfile/tistory/997DA3425B5093EB14"
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
        <Weather />
        <Time />
      </div>
    </div>
  );
};

export default Menubar;

const menu = () => (
  <>
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
  </>
);
