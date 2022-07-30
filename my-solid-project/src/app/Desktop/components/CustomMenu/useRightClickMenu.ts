import { onCleanup, onMount, createSignal, Setter } from "solid-js";
import { createStore } from "solid-js/store";
import { createTextFile } from "./rightClickFunctions";
import { customMenu } from "../../../../types/customMenu";
import { useFiles } from "../../../../context/FilesContext";
import useCreateMenu from "./useCreateMenu";

const useRightClickMenu = () => {
  const [open, setOpen] = createSignal(false);
  const [position, setPosition] = createStore({
    left: 0,
    top: 0,
  });
  const [context, setContext] = createSignal("");
  const { makeFile, deleteFile, makeDir } = useFiles();

  const [menus, setMenus] = createStore<customMenu[]>([]);

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
        let tmpcontext =
          (e.target as HTMLElement).id === "mainDesktop"
            ? "/home/desktop"
            : (e.target as HTMLElement).id;
        setContext(tmpcontext);
        setMenus(
          useCreateMenu("defaultMenu", {
            createTextFile: createTextFile,
            createTextFileArgs: [context(), makeFile],
            makeDir: makeDir,
            makeDirArgs: [context()],
          })
        );

        return;
      }

      case new RegExp("/home").test(target): {
        {
          setPosition({
            left: e.pageX,
            top: e.pageY,
          });
          setOpen(true);
          let tmpcontext =
            (e.target as HTMLElement).id === "mainDesktop"
              ? "/home/desktop"
              : (e.target as HTMLElement).id;
          setContext(tmpcontext);
          setMenus(
            useCreateMenu("defaultMenu", {
              createTextFile: createTextFile,
              createTextFileArgs: [context(), makeFile],
              makeDir: makeDir,
              makeDirArgs: [context()],
            })
          );

          return;
        }
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
        setContext(context);
        setMenus(
          useCreateMenu("iconMenu", {
            deleteFile: () => {
              deleteFile(`${context}${fileName}`);
              console.log("File deleted");
            },
          })
        );

        return;
      }

      //with directory in finder
      case /^(.+\/)[^.]+$/.test(target): {
        let match = /^(.+\/)[^.]+$/.exec(target);
        setContext(match![0]);
        setPosition({
          left: e.pageX,
          top: e.pageY,
        });
        setOpen(true);
        setMenus(
          useCreateMenu("defaultMenu", {
            createTextFile: createTextFile,
            createTextFileArgs: [context(), makeFile],
            makeDir: makeDir,
            makeDirArgs: [context()],
          })
        );

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
