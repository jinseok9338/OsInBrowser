import { onCleanup, onMount, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
const useRightClickMenu = () => {
  const [open, setOpen] = createSignal(false);
  const [position, setPosition] = createStore({
    left: 0,
    top: 0,
  });

  interface customMenu {
    title: string;
    iconPath: string;
  }

  const [menus, setMenus] = createStore<customMenu[]>([]);

  const defaultMenu: customMenu[] = [
    { iconPath: "fa fa-file", title: "createFile" },
  ];

  const rightMouseEvent = (e: MouseEvent) => {
    e.preventDefault();
    setPosition({
      left: e.pageX,
      top: e.pageY,
    });
    setOpen(true);
    setMenus(defaultMenu);

    //make modal at that position.
  };

  const leftMouseEvent = (e: MouseEvent) => {
    e.preventDefault();
    if (e.button === 0) {
      setOpen(false);
    }
  };

  onMount(() => {
    window.addEventListener("contextmenu", rightMouseEvent);
    window.addEventListener("click", leftMouseEvent);
    onCleanup(() => {
      window.removeEventListener("contextmenu", leftMouseEvent);
      window.removeEventListener("contextmenu", rightMouseEvent);
    });
  });

  return {
    open,
    position,
    menus,
  };
};

export default useRightClickMenu;
