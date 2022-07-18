import { onCleanup, onMount, createSignal, Setter } from "solid-js";
import { createStore } from "solid-js/store";

import { fileType } from "../context/FileDirectoryContext";
import { useFileSystem } from "../context/windowFileSystem";

import { createTextFile } from "../app/Desktop/components/CustomMenu/rightClickFunctions";
import { menusCollection } from "../utils/constants";
import { customMenu } from "../types/customMenu";

const useRightClickMenu = (
  setFiles: Setter<fileType[]>,
  customMenus?: customMenu[]
) => {
  const [open, setOpen] = createSignal(false);
  const [position, setPosition] = createStore({
    left: 0,
    top: 0,
  });
  const [context, setContext] = createSignal("");

  const { fs } = useFileSystem();

  const [menus, setMenus] = createStore<customMenu[]>([]);

  const defaultMenu: customMenu[] = [
    {
      iconPath: "fa fa-file",
      title: "create Text File",
      onClick: (e: MouseEvent) => createTextFile(e, setFiles, context()),
      props: {},
    },
    {
      iconPath: "fa fa-folder-open",
      title: "create Folder",
      onClick: () => alert("create Folder"),
      props: {},
    },
    {
      iconPath: "fa fa-cogs",
      title: "settings",
      onClick: () => alert("setting Opened"),
      props: {},
    },
  ];

  const rightMouseEvent = (e: MouseEvent) => {
    const target = (e.target as HTMLElement).id;
    console.log(target);
    e.preventDefault();

    switch (true) {
      case new RegExp("mainDesktop").test(target):
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

      //with file
      case /^(\/.*)(\/.*\.\w+)$/.test(target):
        let match = /^(\/.*)(\/.*\.\w+)$/.exec(target);
        let context = match![1];
        let fileName = match![2];
        setPosition({
          left: e.pageX,
          top: e.pageY,
        });
        setOpen(true);
        setMenus(menusCollection.fileMenu);

        setContext(context);
        return;

      //with directory
      case /^((\/[^.\/]*)*)(\/[^.\/]*)$/.test(target):
        let exec = /^((\/[^.\/]*)*)(\/[^.\/]*)$/.exec(target);

        setPosition({
          left: e.pageX,
          top: e.pageY,
        });
        setOpen(true);
        setMenus(defaultMenu);
        setContext(exec![1]);
        return;

      // with dock menu
      case new RegExp("dock-icon").test(target):
        setPosition({
          left: e.pageX,
          top: e.pageY,
        });
        setOpen(true);
        setMenus(defaultMenu);

        return;

      default:
        return;
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
