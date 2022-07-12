import { fstat } from "fs";
import { onCleanup, onMount, createSignal, Setter } from "solid-js";
import { createStore } from "solid-js/store";
import { setIcon } from "../app/Finder/finderFunction/setIcon";
import { fileType } from "../context/FileDirectoryContext";
import { useFileSystem } from "../context/windowFileSystem";

interface customMenu {
  title: string;
  iconPath: string;
}

const useRightClickMenu = (setFiles: Setter<fileType[]>) => {
  const [open, setOpen] = createSignal(false);
  const [position, setPosition] = createStore({
    left: 0,
    top: 0,
  });

  const { fs } = useFileSystem();

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
      window.removeEventListener("click", leftMouseEvent);
      window.removeEventListener("contextmenu", rightMouseEvent);
    });
  });

  //createDummy Text File
  // but this doesn't affect the lifeCycle... Darn it ... what to do ??
  const createFile = () => {
    fs?.writeFileSync("/home/desktop/test.txt", "this is the test");
    const filesString = fs?.readdirSync("/home/desktop");
    const files = filesString?.map((value) => ({
      name: value,
      path: setIcon(value),
    }));
    setFiles(files!);
  };

  return {
    open,
    position,
    menus,
    createFile,
  };
};

export default useRightClickMenu;
