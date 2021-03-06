import highVolume from "./icons/high-volume.png";
import blueTooth from "./icons/bluetooth.png";
import wifiSignal from "./icons/wifi-signal.png";
import search from "./icons/search.png";
import microphone from "./icons/microphone.png";
import { createSignal, onCleanup } from "solid-js";

import { ProcessState } from "../../../types/processDirectory";
import { OpenProgrammatically } from "../../DropDownMenus/example";

const Menubar = () => {
  const [time, setTime] = createSignal(new Date(Date.now()).toLocaleString());
  const [process, setProcess] = createSignal({} as ProcessState);

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
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Apple_logo_white.svg/1010px-Apple_logo_white.svg.png"
          class="apple-logo"
          width="18"
          height="20"
          alt=""
        />
        <div class="menus">
          {Object.keys(process()).length != 0
            ? process().processName
            : "Finder"}
        </div>
        {Object.keys(process()).length != 0 ? (
          process().menus?.map((menu) => (
            <div class="menus">{menu.starting}</div>
          ))
        ) : (
          <>
            <div class="menus">
              <OpenProgrammatically />
            </div>
            <div class="menus">{"Edit"}</div>
            <div class="menus">{"View"}</div>
            <div class="menus">{"Go"}</div>
            <div class="menus">{"Window"}</div>
            <div class="menus">{"Help"}</div>
          </>
        )}
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
