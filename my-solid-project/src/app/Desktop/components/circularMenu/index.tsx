import { createSignal } from "solid-js";

const CircularMenu = () => {
  const [open, setOpen] = createSignal("");

  return (
    <div class="container">
      <div
        class={`menu-toggle ${open()}`}
        onClick={() => {
          setOpen((prev) => (prev == "" ? "open" : ""));
        }}
      >
        <span class="fa fa-home"></span>
      </div>

      <div class={`menu-round ${open()}`}>
        <div class="btn-app">
          <div class="fa fa-twitter"></div>
        </div>
        <div class="btn-app">
          <div class="fa fa-facebook"></div>
        </div>
        <div class="btn-app">
          <div class="fa fa- fa-wikipedia-w"></div>
        </div>
      </div>

      <div class={`menu-line ${open()}`}>
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
