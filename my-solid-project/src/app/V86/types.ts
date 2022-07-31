import type { config } from "./config";

export type SizeCallback = (dimensions: number[]) => void;

export type EventCallback = (data: number[]) => void;

type EventListener = (event: string, callback: EventCallback) => void;

export type V86Starter = {
  add_listener: EventListener;
  destroy: () => void;
  lock_mouse: () => void;
  remove_listener: EventListener;
  //   save_state: (callback: (error: Error, newState: ArrayBuffer) => void) => void;
};

export type V86Config = typeof config & {
  memory_size: number;
  vga_memory_size: number;
  boot_order: number;
  cdrom?: {
    url?: string;
  };
  fda?: {
    url?: string;
  };
  screen_container: HTMLDivElement | null;
};

type V86Constructor = new (v86Config: V86Config) => V86Starter;

// declare global {
//   interface Window {
//     DEBUG?: boolean;
//     V86Starter: V86Constructor;
//   }
// }

export type WindowWithV86Starter = Window &
  typeof globalThis & { V86Starter: V86Constructor };

export type NavigatorWithMemory = Navigator & {
  deviceMemory?: number;
};
