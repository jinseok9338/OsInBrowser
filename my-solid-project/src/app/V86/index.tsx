import { createSignal } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { useProcess } from "../../context/processDirectory";
import { V86Starter } from "./types";
import useV86 from "./useV86";
import useV86ScreenSize from "./useV86ScreenSize";

interface V86Props {
  url: string; // onject to url string
}

const V86Emulator = ({ url }: V86Props): JSX.Element => {
  const [txtStyle, setTxtStyle] = createSignal({});
  const [LockMouse, setLockMouse] = createSignal(() => {});
  const [state, { changeProcessDimension }] = useProcess();

  const process = state.find((process) => process.id == "V86");
  console.log(process);

  return (
    <div
      ref={(el) => {
        const { emulator, lockMouse } = useV86(url, el);
      }}
    >
      <div
        style={
          "white-space: pre; font: 14px monospace; line-height: 14px; top: 2px;"
        }
      ></div>
      <canvas style="display: none"></canvas>
    </div>
  );
};
export default V86Emulator;
