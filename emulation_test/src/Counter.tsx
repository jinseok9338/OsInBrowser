import { createSignal } from "solid-js";
import { V86Starter } from "./types";
import useV86 from "./useV86";

export default function Counter() {
  const imageUrl = "./v86/image/linux4.iso";
  return (
    <div
      ref={(el) => {
        const { emulator } = useV86(imageUrl, el);
        console.log(emulator()); // this emulation returns null.... shit what am I supposed to do..??
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
}
