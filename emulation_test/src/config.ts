export const BOOT_CD_FD_HD = 0x213;
export const BOOT_FD_CD_HD = 0x231;

export const config = {
  autostart: true,
  log_level: 0,
  filesystem: {
    basefs: "/",
    baseurl: "/",
  },
  network_relay_url: "wss://relay.widgetry.org/",
  wasm_path: "/v86/v86/v86.wasm",
  bios: { url: "/v86/v86/bios/seabios.bin" },
  vga_bios: { url: "/v86/v86/bios/vgabios.bin" },
};
