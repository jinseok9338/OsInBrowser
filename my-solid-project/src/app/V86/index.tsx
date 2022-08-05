import { onMount } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import useV86 from "./useV86";
import useV86ScreenSize from "./useV86ScreenSize";

interface V86Props {
  url: string; // onject to url string
}

const V86Emulator = ({ url }: V86Props): JSX.Element => {
  console.log(url);
  let screenRef: HTMLDivElement | undefined = undefined;

  const { emulator, lockMouse } = useV86(url, screenRef!);
  const txtStyle = useV86ScreenSize(screenRef!, emulator);
  return (
    <div ref={screenRef} onClick={() => lockMouse()}>
      <div
        style={{
          whiteSpace: "pre",
          font: "14px monospace",
          lineHeight: "14px",
        }}
      />
      <canvas style="display: none" />
    </div>
  );
};
export default V86Emulator;
