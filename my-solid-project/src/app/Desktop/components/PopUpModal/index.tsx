import { createSignal } from "solid-js";
import { Portal, Show } from "solid-js/web";

interface PopUpModalProps {
  severity: "Error" | "Warning" | "Info" | "Success";
  show: boolean;
  description: string;
}

const PopUpModal = ({ severity, show, description }: PopUpModalProps) => {
  //depending on the secerity icon and color changes

  //onMouseEnter change the transparency if the alert
  const [closeButtonVisible, setCloseButtonVisible] = createSignal("hidden");

  return (
    <Show when={show}>
      <Portal>
        <div
          class={`${severity} alert`}
          onMouseEnter={() => {
            setCloseButtonVisible("visible");
          }}
          onMouseLeave={() => {
            setCloseButtonVisible("hidden");
          }}
          style={{
            opacity: closeButtonVisible() == "visible" ? 0.6 : 1,
          }}
        >
          <div class="iconBox">
            <i
              class={`fa ${
                severity == "Error"
                  ? "fa-exclamation-triangle"
                  : severity == "Warning"
                  ? "fa-exclamation-circle"
                  : severity == "Info"
                  ? "fa-info-circle"
                  : "fa-check-circle"
              }`}
              aria-hidden="true"
            ></i>
          </div>
          <div class="textBox">
            <span class="heading">{severity}</span>
            <span class="description">{description}</span>
          </div>
          <div
            class="ModalCloseButton"
            style={{
              visibility: closeButtonVisible(),
            }}
          >
            <i class="fa fa-times-circle-o" aria-hidden="true"></i>
          </div>
        </div>
      </Portal>
    </Show>
  );
};

export default PopUpModal;

// box-sizing : border-box;
// background : rgb(247, 88, 160) none repeat scroll 0% 0% / auto padding-box border-box;
// border-radius : 8px;
// border-width : 0px;
// color : rgb(40, 42, 54);
// display : grid;
// grid-template-columns : 57px 293px 0px;
// position : relative;
// user-select : none;
// background-color : rgb(247, 88, 160);
