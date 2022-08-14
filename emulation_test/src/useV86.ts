import { BOOT_CD_FD_HD, BOOT_FD_CD_HD, config as v86Config } from "./config";

import { V86Starter } from "v86";
import { v86WASM, seabios, vgabios } from "v86/build/binaries";

import { createSignal, onMount } from "solid-js";

const useV86 = (url: string, screenContainer: HTMLDivElement) => {
  //@ts-ignore
  const [emulator, setEmulator] = createSignal<V86Starter | null>(null);

  onMount(() => {
    async function initEmulation() {
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
      console.log(emulator());
    }

    initEmulation();
  });

  return { emulator };
};

export default useV86;
