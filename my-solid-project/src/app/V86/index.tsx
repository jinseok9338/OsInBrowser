import { createEffect, createMemo, createSignal, onMount } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { V86Starter } from "./types";
import useV86 from "./useV86";
import useV86ScreenSize from "./useV86ScreenSize";

interface V86Props {
  url: string; // onject to url string
}

const V86Emulator = ({ url }: V86Props): JSX.Element => {
  let screenRef: HTMLDivElement;
  const [ref, setRef] = createSignal<HTMLDivElement | null>(null);

  createEffect(() => {
    console.log(ref());
    if (screenRef) {
      setRef(screenRef);
    }
    return screenRef;
  });

  const { emulator, lockMouse } = useV86(url, ref()!);

  const txtStyle = useV86ScreenSize(ref()!, emulator);

  return (
    <div ref={ref()!}>
      <div style="white-space: pre; font: 14px monospace; line-height: 14px"></div>
      <canvas style="display: none"></canvas>
    </div>
  );
};
export default V86Emulator;
