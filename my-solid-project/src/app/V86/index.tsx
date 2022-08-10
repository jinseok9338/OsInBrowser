import { createEffect, createMemo, createSignal, onMount } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { V86Starter } from "./types";
import useV86 from "./useV86";
import useV86ScreenSize from "./useV86ScreenSize";

interface V86Props {
  url: string; // onject to url string
}

let screenRef: HTMLDivElement;

const V86Emulator = ({ url }: V86Props): JSX.Element => {
  return (
    <div
      ref={(el) => {
        useV86(url, el);
      }}
    >
      <div style="white-space: pre; font: 14px monospace; line-height: 14px"></div>
      <canvas style="display: block"></canvas>
    </div>
  );
};
export default V86Emulator;
