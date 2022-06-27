const useResize = (
  ref?: HTMLDivElement | ((el: HTMLDivElement) => void) | undefined
) => {
  const onMouseDown = (e: MouseEvent) => {
    console.log("MouseDown");
    window.removeEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!ref) {
      console.log("ref is not defined yet");
      return;
    }

    let classList = (ref as HTMLDivElement).classList;
    console.log("mouseMove");
    if (classList.contains("right-top")) {
      console.log("right-top");
    }

    if (classList.contains("right")) {
      console.log("right");
    }

    if (classList.contains("right-bottom")) {
      console.log("right-bottom");
    }

    if (classList.contains("top")) {
      console.log("top");
    }

    if (classList.contains("left-top")) {
      console.log("left-top");
    }

    if (classList.contains("left-bottom")) {
      console.log("left-bottom");
    }

    if (classList.contains("left")) {
      console.log("left");
    }

    if (classList.contains("bottom")) {
      console.log("bottom");
    }
  };

  const onMouseUp = (e: MouseEvent) => {
    console.log("MouseUp");
    window.removeEventListener("mousemove", onMouseMove);
  };

  return { onMouseDown };
};

export default useResize;
