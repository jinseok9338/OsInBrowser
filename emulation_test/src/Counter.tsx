import { V86Starter } from "v86";
import { v86WASM, seabios, vgabios } from "v86/build/binaries";

import { createSignal, onMount } from "solid-js";

export default function Counter() {
  let emulatorDiv: HTMLDivElement | ((el: HTMLDivElement) => void);
  const imageUrl = "/v86/image/linux4.iso";
  const [emulator, setEmulator] = createSignal<V86Starter | null>(null);

  onMount(() => {
    async function initEmulation() {
      const Emulator = new V86Starter({
        wasm_fn: async (param: any) =>
          (await WebAssembly.instantiate(await v86WASM, param)).instance
            .exports,
        memory_size: 32 * 1024 * 1024,
        vga_memory_size: 2 * 1024 * 1024,
        screen_container: emulatorDiv,
        bios: { buffer: await seabios },
        vga_bios: { buffer: await vgabios },
        cdrom: { url: imageUrl },
        autostart: true,
      });
      setEmulator(Emulator);
      console.log(emulator(), "this is emulator");
    }

    initEmulation();
  });

  return (
    <div ref={emulatorDiv} onClick={() => console.log(emulator())}>
      <div
        style={
          "white-space: pre; font: 14px monospace; line-height: 14px; top: 2px;"
        }
      ></div>
      <canvas style="display: none"></canvas>
    </div>
  );
}
