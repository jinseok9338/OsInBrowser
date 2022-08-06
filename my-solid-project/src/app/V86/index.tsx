import { onMount } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import useV86 from "./useV86";
import useV86ScreenSize from "./useV86ScreenSize";

interface V86Props {
  url: string; // onject to url string
}

const V86Emulator = ({ url }: V86Props): JSX.Element => {
  console.log(url);
  let screenRef: HTMLDivElement = document.getElementById(
    "screen_container"
  ) as HTMLDivElement;

  const { emulator, lockMouse } = useV86(url, screenRef!);

  const txtStyle = useV86ScreenSize(screenRef!, emulator);
  return (
    <div id="screen_container" onClick={lockMouse()}>
      {/* <div style={txtStyle} /> */}
      <div style="white-space: pre; font: 14px monospace; line-height: 14px position: relative;"></div>
      <canvas style={"height:100% !important; width:100% !important"} />
    </div>
  );
};
export default V86Emulator;
