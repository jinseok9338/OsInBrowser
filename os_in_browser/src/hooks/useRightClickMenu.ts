import { onCleanup, onMount, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
const useRightClickMenu = () => {
  const [open, setOpen] = createSignal(false);
  const [position, setPosition] = createStore({
    left: 0,
    top: 0,
  });

  const rightMouseEvent = (e: MouseEvent) => {
    e.preventDefault();
    setPosition({
      left: e.pageX,
      top: e.pageY,
    });
    setOpen(true);

    //make modal at that position.
  };

  onMount(() => {
    window.addEventListener("contextmenu", rightMouseEvent);

    onCleanup(() => window.removeEventListener("contextmenu", rightMouseEvent));
  });

  return {
    open,
    position,
  };
};

export default useRightClickMenu;
