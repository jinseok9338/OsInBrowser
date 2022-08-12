"use strict";
import { BOOT_CD_FD_HD, BOOT_FD_CD_HD, config as v86Config } from "./config";
import type {
  NavigatorWithMemory,
  V86Starter,
  WindowWithV86Starter,
} from "./types";

import { useFileSystem } from "../../context/windowFileSystem";
import { createSignal, createMemo, createEffect, onCleanup } from "solid-js";
import { loadScript, bufferToUrl } from "../../utils/fileFunctions";

type V86 = {
  emulator: V86Starter | null;
  lockMouse: () => void;
};

const useV86 = (url: string, screenContainer: HTMLDivElement) => {
  const { fs } = useFileSystem();

  const [emulator, setEmulator] = createSignal<V86Starter | null>(null);
  const lockMouse = createMemo(() => emulator()?.lock_mouse);

  const getExtension = (directory: string) => {
    return /[.]/.exec(directory) ? /[^.]+$/.exec(directory) : undefined;
  };

  createEffect(() => {
    const Emulator = emulator();

    if (!Emulator && screenContainer) {
      fs?.readFile(url, (_error, contents = Buffer.from("")) => {
        const extension = getExtension(url)!.toString().toLowerCase();

        const isISO = extension === "iso";

        loadScript("/libs/v86/libv86.js", () => {
          const { deviceMemory = 8 } = navigator as NavigatorWithMemory;
          const memoryRatio = deviceMemory / 8;

          var Emulator = new (window as WindowWithV86Starter).V86Starter({
            memory_size: memoryRatio * 1024 * 1024 * 1024,
            vga_memory_size: memoryRatio * 32 * 1024 * 1024,
            boot_order: isISO ? BOOT_CD_FD_HD : BOOT_FD_CD_HD,
            [isISO ? "cdrom" : "fda"]: { url: bufferToUrl(contents) },
            screen_container: screenContainer,
            ...v86Config,
          });

          setEmulator(Emulator);

          console.log(emulator());
        });
      });
    }
    onCleanup(() => Emulator?.destroy?.());
    return [screenContainer, Emulator];
  });

  return {
    emulator,
    lockMouse,
  };
};

export default useV86;
