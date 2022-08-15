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
    changeProcessDimension: (id: string, dimension: Dimension) => void;
    enlarge: (id: string) => void;
    changeActive: (id: string) => void;
    shrink: (id: string) => void;
    openFile: (processId: string, filePath: string) => void;
  }
];

export interface ProcessState {
  processName: string;
  process: JSX.Element;
  id: string; // UUID
  dimension: Dimension;
  isFullSize: boolean;
  tempDimension?: Dimension;
  iconPath: string;
  active: boolean;
  menus?: Menus[];
  isShrunk: boolean;
}

export interface Menus {
  starting: string;
  menus: Menu[];
}

export interface Menu {
  [key: string]: string | Menu;
}

export interface Dimension {
  left: number;
  top: number;
  width: number;
  height: number;
}
