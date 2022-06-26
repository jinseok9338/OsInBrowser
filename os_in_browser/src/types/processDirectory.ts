import { JSX } from "solid-js/jsx-runtime";

export type ThemeContextState = {
  readonly color: string;
  readonly title: string;
};

export type ProcessesContextValue = [
  state: ProcessState[],
  actions: {
    addProcess: (id: string) => void;
    deleteProcess: (id: string) => void;
  }
];

export interface ProcessState {
  processName?: string;
  process?: JSX.Element;
  id?: String; // UUID
  dimension?: Dimension;
  isFullSize?: boolean;
  tempDimension: Dimension;
  iconPath: String;
  active: boolean;
}

export interface Dimension {
  left: number;
  top: number;
  width: number;
  heigth: number;
}