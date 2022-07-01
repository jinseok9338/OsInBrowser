import { createSignal, JSX, onMount } from "solid-js";
import { Dimension } from "../types/processDirectory";

const OnClickDragBox = () => {
  const [dimension, SetDimension] = createSignal<Dimension>({
    heigth: 0,
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
    console.log("mouseDownF");
  };

  const makeBox = (e: MouseEvent) => {
    // set Dimension
    const newWidth = width + (e.pageX - mouseX());
    const newHeight = heigth - (e.pageY - mouseY());

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
    console.log("MouseUp");
    window.removeEventListener("mousemove", () => {
      makeBox(e);
    });
  };

  const { heigth, width, top, left } = dimension();

  onMount(() => {
    window.addEventListener("mousedown", onmousedown);
  });

  return (
    <div
      class="onClickDragBox"
      style={`
height:${heigth}px;
width:${width}px;
top:${top}px;
left:${left}px;
`}
    />
  );
};

export default OnClickDragBox;
