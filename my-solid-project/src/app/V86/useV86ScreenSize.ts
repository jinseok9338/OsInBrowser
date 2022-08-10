import type { SizeCallback, V86Starter } from "./types";

import { createEffect, onCleanup, Accessor } from "solid-js";
import { useProcess } from "../../context/processDirectory";
import { ProcessExists } from "../../utils/processes";

const SET_SCREEN_GFX = "screen-set-size-graphical";
const SET_SCREEN_TXT = "screen-set-size-text";

const useV86ScreenSize = (
  screenContainer: HTMLDivElement,
  emulator: Accessor<V86Starter | null>
) => {
  const [state, { changeProcessDimension }] = useProcess();

  const emulatorApp = state.find((process) => process.id == "V86");
  const lineHeight = emulatorApp?.dimension.height;
  const BORDER_OFFSET = 3;

  const setScreenGfx: SizeCallback = ([width, height]) =>
    changeProcessDimension("V86", {
      height: height + 25,
      left: emulatorApp?.dimension.left!,
      width: width,
      top: emulatorApp?.dimension.top!, // needs to change it
    });

  const setScreenText: SizeCallback = ([cols, rows]) => {
    changeProcessDimension("V86", {
      height: rows * lineHeight! + 25 + BORDER_OFFSET,
      left: emulatorApp?.dimension.left!,
      width: (cols / 2 + 4) * lineHeight!,
      top: emulatorApp?.dimension.top!,
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
    lineHeight,
    top: BORDER_OFFSET - 1,
    position: "relative" as "relative",
  };
};

export default useV86ScreenSize;
