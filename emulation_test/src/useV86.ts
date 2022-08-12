"use strict";
import { BOOT_CD_FD_HD, BOOT_FD_CD_HD, config as v86Config } from "./config";

import { V86Starter } from "v86";
import { v86WASM, seabios, vgabios } from "v86/build/binaries";

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

  createEffect(() => {
    async function main() {
      const Emulator = new V86Starter({
        wasm_fn: async (param: any) =>
          (await WebAssembly.instantiate(await v86WASM, param)).instance
            .exports,
        memory_size: 32 * 1024 * 1024,
        vga_memory_size: 2 * 1024 * 1024,
        screen_container: screenContainer,
        bios: { buffer: await seabios },
        vga_bios: { buffer: await vgabios },
        cdrom: { url: url },
        autostart: true,
      });
      setEmulator(Emulator);
    }
    main();
  }, []);

  return { emulator };
};

export default useV86;
