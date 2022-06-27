import { createSignal, onMount } from "solid-js";
import useResize from "../hooks/useResize";
import { Dimension } from "../types/processDirectory";

type refType = HTMLDivElement | ((el: HTMLDivElement) => void) | undefined;

interface ResizerFunctions {
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

interface resizerProps {
  id: string;
  dimension: Dimension;
}

const Resizers = ({ id, dimension }: resizerProps) => {
  const [resizers, setResizers] = createSignal({} as ResizerFunctions);

  let rightBottomResizer: refType;
  let rightTopResizer: refType;
  let topResizer: refType;
  let rightResizer: refType;
  let leftBottomResizer: refType;
  let leftTopResizer: refType;
  let leftResizer: refType;
  let bottomResizer: refType;

  onMount(() => {
    const rightBottomResize = useResize(id, dimension, rightBottomResizer);
    const rightTopResize = useResize(id, dimension, rightTopResizer);
    const topResize = useResize(id, dimension, topResizer);
    const rightResize = useResize(id, dimension, rightResizer);
    const leftBottomResize = useResize(id, dimension, leftBottomResizer);
    const leftTopResize = useResize(id, dimension, leftTopResizer);
    const leftResize = useResize(id, dimension, leftResizer);
    const bottomResize = useResize(id, dimension, bottomResizer);

    setResizers({
      rightBottomResize,
      rightTopResize,
      topResize,
      rightResize,
      leftBottomResize,
      leftTopResize,
      leftResize,
      bottomResize,
    });
  });

  return (
    <>
      <div class="right-top resizer" ref={rightTopResizer}></div>
      <div class="right resizer" ref={rightResizer}></div>
      <div
        class="right-bottom resizer"
        ref={rightBottomResizer}
        onmousedown={(e) => resizers()?.rightBottomResize?.onMouseDown(e)}
      ></div>
      <div class="top resizer" ref={topResizer}></div>
      <div class="left-top resizer" ref={leftTopResizer}></div>
      <div
        class="left-bottom resizer"
        ref={leftBottomResizer}
        onmousedown={(e) => resizers()?.leftBottomResize?.onMouseDown(e)}
      ></div>
      <div class="left resizer" ref={leftResizer}></div>
      <div class="bottom resizer" ref={bottomResizer}></div>
    </>
  );
};

export default Resizers;
