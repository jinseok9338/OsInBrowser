import { createSignal } from "solid-js";
//when dragging chagne the style to position absolute and set the top left with mouse coordinate
// on release set the position to block then it will go back to the original position
const MINIMUM_TOP = 30;

const useFileDrag = (ref: HTMLElement) => {
  const [top, setTop] = createSignal(0);
  const [left, setLeft] = createSignal(0);
  let originalLeft = ref.style.left;
  let originalTop = ref.style.top;
  const onMouseMove = (e: MouseEvent) => {
    // this is where the magic happens
    e.preventDefault();

    let newLeft = e.pageX - left();
    let newTop = e.pageY - top();

    if (newLeft > 0 && newTop > MINIMUM_TOP) {
    }

    if (newLeft <= 0 && newTop > MINIMUM_TOP) {
    }

    if (newLeft > 0 && newTop <= MINIMUM_TOP) {
    }

    if (newLeft <= 0 && newTop <= MINIMUM_TOP) {
    }
  };

  const onMouseUp = (e: MouseEvent) => {
    e.preventDefault();
    window.removeEventListener("mousemove", onMouseMove);
  };

  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault();

    setLeft(() => e.pageX - left()); // need to know the original left and top
    setTop(() => e.pageY - top());

    window.removeEventListener("mouseup", onMouseUp); // this is for clean up

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return {
    top,
    left,
    onMouseDown,
  };
};

export default useFileDrag;
