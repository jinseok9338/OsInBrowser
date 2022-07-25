import { createSignal, onMount } from "solid-js";
import { Dimension } from "../../../../types/processDirectory";

const useMakeBox = () => {
  const [dimension, SetDimension] = createSignal<Dimension>({
    height: 0,
    width: 0,
    top: 0,
    left: 0,
  });

  const [mouseX, setMouseX] = createSignal(0);
  const [mouseY, setMouseY] = createSignal(0);

  // add event listener on mousedown // remove event listener on mouse up, get the initial X, Y position
  // add event listener on mousemove // resize the box
  // add event listener on mouseup // delete the resize box
  const onmousedown = (e: MouseEvent) => {
    window.removeEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", () => {
      makeBox(e);
    });
    window.addEventListener("mouseup", onMouseUp);

    const mouseX = e.pageX;
    const mouseY = e.pageY;
    setMouseX(mouseX);
    setMouseY(mouseY);

    SetDimension(
      (prev) =>
        ({
          ...prev,
          top: mouseY,
          left: mouseX,
        } as Dimension)
    );
  };

  const makeBox = (e: MouseEvent) => {
    // set Dimension
    const newWidth = width + (e.pageX - mouseX());
    const newHeight = height - (e.pageY - mouseY());

    SetDimension(
      (prev) =>
        ({
          ...prev,
          height: newHeight,
          width: newWidth,
        } as Dimension)
    );
  };

  const onMouseUp = (e: MouseEvent) => {
    e.preventDefault();

    window.removeEventListener("mousemove", () => {
      makeBox(e);
    });
  };

  const { height, width, top, left } = dimension();

  onMount(() => {
    window.addEventListener("mousedown", onmousedown);
  });

  return { height, width, top, left };
};

export default useMakeBox;
