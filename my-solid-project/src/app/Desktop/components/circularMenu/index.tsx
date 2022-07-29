import { createSignal } from "solid-js";

const CircularMenu = () => {
  const [open, setOpen] = createSignal("");

  return (
    <div class="circularMenu-container">
      <div
        class={`circularMenu-toggle ${open()}`}
        onClick={() => {
          setOpen((prev) => (prev == "" ? "open" : ""));
        }}
      >
        <span class="fa fa-home"></span>
      </div>

      <div class={`circularMenu-round ${open()}`}>
        <div class="btn-app" onClick={() => alert("setting opened")}>
          <div class="fa fa-cog"></div>
        </div>
        <div
          class="btn-app"
          onClick={() => window.open("https://www.linkedin.com/in/jinseok9338")}
        >
          <div class="fa fa-linkedin-square"></div>
        </div>
        <div
          class="btn-app"
          onClick={() =>
            window.open("https://github.com/jinseok9338/OsInBrowser")
          }
        >
          <div class="fa fa-github"></div>
        </div>
      </div>

      <div class={`circularMenu-line ${open()}`}>
        <div class="btn-app">
          <div class="fa fa-map-marker"></div>
        </div>
        {/* <div class="btn-app">
          <div class="fa fa-envelope"></div>
        </div>
        <div class="btn-app">
          <div class="fa fa-video-camera"></div>
        </div>
        <div class="btn-app">
          <div class="fa fa-soundcloud"></div>
        </div>
        <div class="btn-app">
          <div class="fa fa-graduation-cap"></div>
        </div>
        <div class="btn-app">
          <div class="fa fa-image"></div>
        </div>
        <div class="btn-app">
          <div class="fa fa-vine"></div>
        </div> */}
      </div>
    </div>
  );
};

export default CircularMenu;
