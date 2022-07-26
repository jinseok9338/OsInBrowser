import { createSignal } from "solid-js";
import { useProcess } from "../../../../context/processDirectory";
import { Dimension } from "../../../../types/processDirectory";

const useResize = (
  id: string,
  dimension: Dimension,
  ref?: HTMLDivElement | ((el: HTMLDivElement) => void) | undefined
) => {
  const [mouseX, setMouseX] = createSignal(0);
  const [mouseY, setMouseY] = createSignal(0);
  const [state, { changeProcessDimension }] = useProcess();
  const MINIMUM_HEIGHT = 500;
  const MINIMUM_WIDTH = 500;
  const { height, left, top, width } = dimension;

  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    window.removeEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    const mouseX = e.pageX;
    const mouseY = e.pageY;
    setMouseX(mouseX);
    setMouseY(mouseY);
  };

  const onMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    if (!ref) {
      return;
    }

    let classList = (ref as HTMLDivElement).classList;

    if (classList.contains("right-top")) {
      const newWidth = width + (e.pageX - mouseX());
      const newHeight = height - (e.pageY - mouseY());

      if (newHeight > MINIMUM_HEIGHT && newWidth > MINIMUM_WIDTH) {
        const newDimension = {
          height: newHeight,
          width: newWidth,
          top: top + (e.pageY - mouseY()),
          left,
        } as Dimension;
        changeProcessDimension(id, newDimension);
      }
    }

    if (classList.contains("right")) {
      const newWidth = width + (e.pageX - mouseX());

      if (newWidth > MINIMUM_WIDTH) {
        const newDimension = {
          height,
          width: newWidth,
          top,
          left,
        } as Dimension;
        changeProcessDimension(id, newDimension);
      }
    }

    if (classList.contains("right-bottom")) {
      e.preventDefault();

      const newWidth = width + (e.pageX - mouseX());
      const newHeight = height + (e.pageY - mouseY());

      if (newHeight > MINIMUM_HEIGHT && newWidth > MINIMUM_WIDTH) {
        const newDimension = {
          height: newHeight,
          width: newWidth,
          top,
          left,
        } as Dimension;
        changeProcessDimension(id, newDimension);
      }
    }

    if (classList.contains("top")) {
      const newHeight = height - (e.pageY - mouseY());

      if (newHeight > MINIMUM_HEIGHT) {
        const newDimension = {
          height: newHeight,
          width,
          top: top + (e.pageY - mouseY()),
          left,
        } as Dimension;
        changeProcessDimension(id, newDimension);
      }
    }

    if (classList.contains("left-top")) {
      const newWidth = width - (e.pageX - mouseX());
      const newHeight = height - (e.pageY - mouseY());

      if (newHeight > MINIMUM_HEIGHT && newWidth > MINIMUM_WIDTH) {
        const newDimension = {
          height: newHeight,
          width: newWidth,
          top: top + (e.pageY - mouseY()),
          left: left + (e.pageX - mouseX()),
        } as Dimension;
        changeProcessDimension(id, newDimension);
      }
    }

    if (classList.contains("left-bottom")) {
      const newWidth = width - (e.pageX - mouseX());
      const newHeight = height + (e.pageY - mouseY());

      if (newHeight > MINIMUM_HEIGHT && newWidth > MINIMUM_WIDTH) {
        const newDimension = {
          height: newHeight,
          width: newWidth,
          top,
          left: left + (e.pageX - mouseX()),
        } as Dimension;
        changeProcessDimension(id, newDimension);
      }
    }

    if (classList.contains("left")) {
      const newWidth = width - (e.pageX - mouseX());

      if (newWidth > MINIMUM_WIDTH) {
        const newDimension = {
          height,
          width: newWidth,
          top,
          left: left + (e.pageX - mouseX()),
        } as Dimension;
        changeProcessDimension(id, newDimension);
      }
    }

    if (classList.contains("bottom")) {
      const newHeight = height + (e.pageY - mouseY());

      if (newHeight > MINIMUM_HEIGHT) {
        const newDimension = {
          height: newHeight,
          width,
          top,
          left,
        } as Dimension;
        changeProcessDimension(id, newDimension);
      }
    }
  };

  const onMouseUp = (e: MouseEvent) => {
    e.preventDefault();

    window.removeEventListener("mousemove", onMouseMove);
  };

  return { onMouseDown };
};

export default useResize;
