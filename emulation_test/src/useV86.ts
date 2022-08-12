"use strict";
import { BOOT_CD_FD_HD, BOOT_FD_CD_HD, config as v86Config } from "./config";
import type {
  NavigatorWithMemory,
  V86Starter,
  WindowWithV86Starter,
} from "./types";

import {
  createSignal,
  createMemo,
  createEffect,
  onCleanup,
  onMount,
} from "solid-js";
import { loadScript } from "./util";

type V86 = {
  emulator: V86Starter | null;
  lockMouse: () => void;
};

const useV86 = (url: string, screenContainer: HTMLDivElement) => {
  const [emulator, setEmulator] = createSignal<V86Starter | null>(null);

  loadScript("/v86/v86/libv86.js", () => {
    const { deviceMemory = 8 } = navigator as NavigatorWithMemory;
    const memoryRatio = deviceMemory / 8;

    var Emulator = new (window as WindowWithV86Starter).V86Starter({
      memory_size: memoryRatio * 1024 * 1024 * 1024,
      vga_memory_size: memoryRatio * 32 * 1024 * 1024,
      boot_order: BOOT_CD_FD_HD,
      cdrom: { url: "" },
      screen_container: screenContainer,
      ...v86Config,
    });

    setEmulator(Emulator);
  });

  return { emulator };
};

export default useV86;
