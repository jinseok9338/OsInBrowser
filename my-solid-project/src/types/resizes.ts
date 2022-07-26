export type refType =
  | HTMLDivElement
  | ((el: HTMLDivElement) => void)
  | undefined;

export interface ResizerFunctions {
  rightBottomResize: {
    onMouseDown: (e: MouseEvent) => void;
  };
  rightTopResize: {
    onMouseDown: (e: MouseEvent) => void;
  };
  topResize: {
    onMouseDown: (e: MouseEvent) => void;
  };
  rightResize: {
    onMouseDown: (e: MouseEvent) => void;
  };
  leftBottomResize: {
    onMouseDown: (e: MouseEvent) => void;
  };
  leftTopResize: {
    onMouseDown: (e: MouseEvent) => void;
  };
  leftResize: {
    onMouseDown: (e: MouseEvent) => void;
  };
  bottomResize: {
    onMouseDown: (e: MouseEvent) => void;
  };
}
