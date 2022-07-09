import { onCleanup, onMount } from "solid-js";

const useRightClickMenu = () => {
  const leftMouseEvent = (e: MouseEvent) => {
    if (e.button === 2) {
      //make modal at that position.
      const menus = [];
      addModal(menus);
    }
  };

  onMount(() => {
    window.addEventListener("click", leftMouseEvent);

    onCleanup(() => window.removeEventListener("click", leftMouseEvent));
  });
};

export default useRightClickMenu;
