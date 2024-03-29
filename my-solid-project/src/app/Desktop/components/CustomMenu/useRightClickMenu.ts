import { onCleanup, onMount, createSignal, Setter } from "solid-js";
import { createStore } from "solid-js/store";

import { createTextFile } from "./rightClickFunctions";
import { CustomMenuOnIcon } from "../../../../utils/constants";
import { customMenu } from "../../../../types/customMenu";

import { useFiles } from "../../../../context/FilesContext";

const useRightClickMenu = () => {
  const [open, setOpen] = createSignal(false);
  const [position, setPosition] = createStore({
    left: 0,
    top: 0,
  });
  const [context, setContext] = createSignal("");
  const { makeFile, deleteFile } = useFiles();

  const [menus, setMenus] = createStore<customMenu[]>([]);

  const defaultMenu: customMenu[] = [
    {
      iconPath: "fa fa-file",
      title: "create Text File",
      onClick: (e: MouseEvent) => createTextFile(e, context(), makeFile),
    },
    {
      iconPath: "fa fa-folder-open",
      title: "create Folder",
      onClick: () => alert("create Folder"),
    },
    {
      iconPath: "fa fa-cogs",
      title: "settings",
      onClick: () => alert("setting Opened"),
    },
  ];

  const rightMouseEvent = (e: MouseEvent) => {
    const target = (e.target as HTMLElement).id;
    console.log(target);
    e.preventDefault();

    switch (true) {
      // Main desktop
      case new RegExp("mainDesktop").test(target): {
        setPosition({
          left: e.pageX,
          top: e.pageY,
        });
        setOpen(true);
        setMenus(defaultMenu);
        let tmpcontext =
          (e.target as HTMLElement).id === "mainDesktop"
            ? "/home/desktop"
            : (e.target as HTMLElement).id;
        setContext(tmpcontext);
        return;
      }

      //with file in desktop
      case /^(\/.*)(\/.*\.\w+)$/.test(target): {
        let match = /^(\/.*)(\/.*\.\w+)$/.exec(target);
        let context = match![1].substring(0, match![1].length);
        let fileName = match![2];
        setPosition({
          left: e.pageX,
          top: e.pageY,
        });
        setOpen(true);
        setMenus(
          CustomMenuOnIcon({
            deleteFile: () => {
              deleteFile(`${context}${fileName}`);
              console.log("File deleted");
            },
          }).menu
        );

        setContext(context);
        return;
      }

      //with directory in finder
      case /^(.+\/)[^.]+$/.test(target): {
        let match = /^(.+\/)[^.]+$/.exec(target);

        setPosition({
          left: e.pageX,
          top: e.pageY,
        });
        setOpen(true);
        setMenus(defaultMenu);
        setContext(match![0]);
        return;
      }

      // with dock menu
      case new RegExp("dock-icon").test(target): {
        setPosition({
          left: e.pageX,
          top: e.pageY,
        });
        // setOpen(true);
        // setMenus(defaultMenu);

        return;
      }

      default: {
        return;
      }
    }
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

  return {
    open,
    position,
    menus,
  };
};

export default useRightClickMenu;
