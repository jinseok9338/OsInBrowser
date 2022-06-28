import highVolume from "./icons/high-volume.png";
import blueTooth from "./icons/bluetooth.png";
import wifiSignal from "./icons/wifi-signal.png";
import search from "./icons/search.png";
import microphone from "./icons/microphone.png";
import { createEffect, createSignal, onCleanup } from "solid-js";

const Menubar = () => {
  const [time, setTime] = createSignal(new Date(Date.now()).toLocaleString());

  createEffect((prev) => {
    setTimeout(() => {
      let now = new Date(Date.now());
      let dateStringNow = now.toLocaleString();
      setTime(dateStringNow);
    }, 1000);
    return time();
  });

  return (
    <div class="menu-bar">
      <div class="leftbar">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Apple_logo_white.svg/1010px-Apple_logo_white.svg.png"
          class="apple-logo"
          width="20"
          height="45"
          alt=""
        />
        <span class="menus active">{"Finder"}</span>
        <span class="menus">{"File"}</span>
        <span class="menus">{"Edit"}</span>
        <span class="menus">{"View"}</span>
        <span class="menus">{"Go"}</span>
        <span class="menus">{"Window"}</span>
        <span class="menus">{"Help"}</span>
      </div>

      <div class="rightbar">
        <div class="menu-ico">
          <img src={highVolume} width="30" height="30" alt="" class="vol" />
        </div>
        <div class="menu-ico">
          <img
            src={blueTooth}
            width="30"
            height="30"
            alt=""
            class="bluetooth"
          />
        </div>
        <div class="menu-ico">
          <i class="fas fa-battery-half"></i>
        </div>
        <div class="menu-ico">
          <img src={wifiSignal} width="30" height="30" alt="" class="wifi" />
        </div>
        <div class="menu-ico">
          <img src={search} width="30" height="30" alt="" class="search" />
        </div>
        <div class="menu-ico">
          <img
            src="https://eshop.macsales.com/blog/wp-content/uploads/2021/03/control-center-icon.png"
            width="30"
            height="30"
            alt=""
            class="control-center"
          />
        </div>
        <div class="menu-ico">
          <img
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
