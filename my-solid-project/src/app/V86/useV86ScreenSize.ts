import type { SizeCallback, V86Starter } from "./types";

import { createEffect, onCleanup, Accessor } from "solid-js";
import { useProcess } from "../../context/processDirectory";

const SET_SCREEN_GFX = "screen-set-size-graphical";
const SET_SCREEN_TXT = "screen-set-size-text";

const useV86ScreenSize = (
  id: string,
  screenContainer: HTMLDivElement,
  emulator?: Accessor<V86Starter>
): void => {
  const [state, { changeProcessDimension }] = useProcess();

  createEffect(() => {
    const Emulator = emulator!();
    const setScreenGfx: SizeCallback = ([width, height]) =>
      changeProcessDimension(id, {
        height: height,
        left: 0,
        width: width,
        top: 0, // needs to change it
      });
    const setScreenText: SizeCallback = ([, rows]) => {
      const { height, width } =
        screenContainer
          ?.querySelector("span:last-of-type")
          ?.getBoundingClientRect() || {};

      if (height && width) changeProcessDimension(id, (rows * height, width));
      // set the dimension to the row and height
    };

    emulator!()?.add_listener(SET_SCREEN_GFX, setScreenGfx);
    emulator!()?.add_listener(SET_SCREEN_TXT, setScreenText);

    onCleanup(() => {
      emulator!()?.remove_listener(SET_SCREEN_GFX, setScreenGfx);
      emulator!()?.remove_listener(SET_SCREEN_TXT, setScreenText);
    });
    return Emulator;
  });
};

export default useV86ScreenSize;
