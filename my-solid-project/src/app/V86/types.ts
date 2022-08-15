import type { config } from "./config";

export type SizeCallback = (dimensions: number[]) => void;

export type EventCallback = (data: number[]) => void;

type EventListener = (event: string, callback: EventCallback) => void;

export type NavigatorWithMemory = Navigator & {
  deviceMemory?: number;
};
