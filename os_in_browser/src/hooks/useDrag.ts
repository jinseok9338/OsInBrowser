import { createSignal } from "solid-js";
import { Dimension } from "../types/processDirectory";

const useDrag = (
  changeProcessDimension: (id: string, dimension: Dimension) => void,
  id: string,
  dimension: Dimension
) => {
  const [left, setLeft] = createSignal(0);
  const [top, setTop] = createSignal(0);
  let originalLeft = dimension.left;
  let originalTop = dimension.top;
  let originalWidth = dimension.width;
  let originalHeight = dimension.heigth;
  const MINIMUM_TOP = 30;

  const onMouseMove = (e: MouseEvent) => {
    // this is where the magic happens
    e.preventDefault();
    let newLeft = e.pageX - left();
    let newTop = e.pageY - top();

    if (newLeft > 0 && newTop > MINIMUM_TOP) {
      changeProcessDimension(id, {
        heigth: originalHeight,
        width: originalWidth,
        top: newTop,
        left: newLeft,
      } as Dimension);
    }
    if (newLeft <= 0 && newTop > MINIMUM_TOP) {
      changeProcessDimension(id, {
        heigth: originalHeight,
        width: originalWidth,
        top: newTop,
        left: 0,
      } as Dimension);
    }

    if (newLeft > 0 && newTop <= MINIMUM_TOP) {
      changeProcessDimension(id, {
        heigth: originalHeight,
        width: originalWidth,
        top: MINIMUM_TOP,
        left: newLeft,
      } as Dimension);
    }

    if (newLeft <= 0 && newTop <= MINIMUM_TOP) {
      changeProcessDimension(id, {
        heigth: originalHeight,
        width: originalWidth,
        top: MINIMUM_TOP,
        left: 0,
      } as Dimension);
    }

    // Update the top and left for the dimension
  };

  const onMouseUp = (e: MouseEvent) => {
    e.preventDefault();
    window.removeEventListener("mousemove", onMouseMove);
  };

  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault();

    setLeft(() => e.pageX - originalLeft);
    setTop(() => e.pageY - originalTop);

    window.removeEventListener("mouseup", onMouseUp); // this is for clean up

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return { onMouseDown };
};

export default useDrag;
