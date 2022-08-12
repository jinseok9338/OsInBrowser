import { createEffect, createSignal, onMount } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";

//@ts-ignore
import { V86Starter } from "v86";
//@ts-ignore
import { v86WASM, seabios, vgabios } from "v86/build/binaries";

import useV86ScreenSize from "./useV86ScreenSize";
import { useFileSystem } from "../../context/windowFileSystem";
import { NavigatorWithMemory } from "./types";
import { bufferToUrl } from "../../utils/fileFunctions";
import { BOOT_CD_FD_HD, BOOT_FD_CD_HD } from "./config";

interface V86Props {
  url: string; // onject to url string
}

const getExtension = (directory: string) => {
  return /[.]/.exec(directory) ? /[^.]+$/.exec(directory) : undefined;
};

const V86Emulator = ({ url }: V86Props): JSX.Element => {
  const [emulator, setEmulator] = createSignal<V86Starter | null>(null);
  const { fs } = useFileSystem();

  async function initEmulation(
    emulatorDiv: HTMLDivElement | ((el: HTMLDivElement) => void),
    url: string
  ) {
    if (!emulator() && emulatorDiv) {
      fs?.readFile(url, async (_error, contents = Buffer.from("")) => {
        const extension = getExtension(url)!.toString().toLowerCase();

        const isISO = extension === "iso";

        const { deviceMemory = 8 } = navigator as NavigatorWithMemory;
        const memoryRatio = deviceMemory / 8;

        const Emulator = new V86Starter({
          wasm_fn: async (param: any) =>
            (await WebAssembly.instantiate(await v86WASM, param)).instance
              .exports,
          memory_size: memoryRatio * 1024 * 1024 * 1024,
          vga_memory_size: memoryRatio * 32 * 1024 * 1024,
          screen_container: emulatorDiv,
          bios: { buffer: await seabios },
          boot_order: isISO ? BOOT_CD_FD_HD : BOOT_FD_CD_HD,
          vga_bios: { buffer: await vgabios },
          [isISO ? "cdrom" : "fda"]: { url: bufferToUrl(contents) },
          network_relay_url: "wss://relay.widgetry.org/",

          autostart: true,
        });

        setEmulator(Emulator);
      });
    }
  }

  return (
    <div
      ref={(el) => initEmulation(el, url)}
      onClick={() => {}}
      style={{
        "background-color": "black",
      }}
    >
      <div
        style={{
          "white-space": "pre",
          font: "14px monospace",
          "line-height": "14px",
        }}
      ></div>
      <canvas style="display: none"></canvas>
    </div>
  );
};
export default V86Emulator;
