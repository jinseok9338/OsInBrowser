const Menubar = () => {
  return (
    <div class="menu-bar">
      <div class="left">
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

      <div class="right">
        <div class="menu-ico">
          <img
            src="../../../assets/icons/high-volume.png"
            width="30"
            height="30"
            alt=""
            class="vol"
          />
        </div>
        <div class="menu-ico">
          <img
            src="os_in_browser/src/assets/icons/bluetooth.png"
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
          <img
            src="os_in_browser/src/assets/icons/wifi-signal.png"
            width="30"
            height="30"
            alt=""
            class="wifi"
          />
        </div>
        <div class="menu-ico">
          <img
            src="os_in_browser/src/assets/icons/search.png"
            width="30"
            height="30"
            alt=""
            class="search"
          />
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
            src="os_in_browser/src/assets/icons/microphone.png"
            width="30"
            height="30"
            alt=""
            class="microphone"
          />
        </div>

        <div class="menu-time">{"3:33"}</div>
      </div>
    </div>
  );
};

export default Menubar;
