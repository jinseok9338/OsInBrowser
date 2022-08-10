import type { SizeCallback, V86Starter } from "./types";

import { createEffect, onCleanup, Accessor } from "solid-js";
import { useProcess } from "../../context/processDirectory";
import { ProcessExists } from "../../utils/processes";
import { Dimension, ProcessState } from "../../types/processDirectory";

const SET_SCREEN_GFX = "screen-set-size-graphical";
const SET_SCREEN_TXT = "screen-set-size-text";

const useV86ScreenSize = (
  screenContainer: HTMLDivElement,
  emulator: Accessor<V86Starter | null>,
  process: ProcessState,
  changeProcessDimension: (id: string, dimension: Dimension) => void
) => {
  const lineHeight = screenContainer.offsetHeight;
  const BORDER_OFFSET = 3;

  const setScreenGfx: SizeCallback = ([width, height]) =>
    changeProcessDimension("V86", {
      height: height + 25,
      left: process?.dimension.left!,
      width: width,
      top: process?.dimension.top!, // needs to change it
    });

  const setScreenText: SizeCallback = ([cols, rows]) => {
    changeProcessDimension("V86", {
      height: rows * lineHeight! + 25 + BORDER_OFFSET,
      left: process?.dimension.left!,
      width: (cols / 2 + 4) * lineHeight!,
      top: process?.dimension.top!,
    });
    // set the dimension to the row and height
  };

  createEffect(() => {
    const Emulator = emulator!();
    Emulator?.add_listener(SET_SCREEN_GFX, setScreenGfx);
    Emulator?.add_listener(SET_SCREEN_TXT, setScreenText);

    onCleanup(() => {
      Emulator?.remove_listener(SET_SCREEN_GFX, setScreenGfx);
      Emulator?.remove_listener(SET_SCREEN_TXT, setScreenText);
    });
    return [Emulator, setScreenGfx, setScreenText];
  });

  return {
    font: `${lineHeight} monospace`,
    lineHeight: `${lineHeight}px`,
    top: `${BORDER_OFFSET - 1}px`,
    position: "relative" as "relative",
  };
};

export default useV86ScreenSize;
