import { For, createSignal, createEffect } from "solid-js";

import { useProcess } from "../../context/processDirectory";

import { useFileSystem } from "../../context/windowFileSystem";
import useRightClickMenu from "./components/CustomMenu/useRightClickMenu";
import CustomMenu from "./components/CustomMenu";

import { fileType } from "../../context/FileDirectoryContext";
import { setIcon } from "../Finder/finderFunction/setIcon";

import FileEntry from "../../sharedComponents/FileEntry";
import useSelectFile from "../../sharedComponents/FileEntry/useSelectFile";
import { v4 as uuidv4 } from "uuid";
import Menubar from "./components/menubar";
import Dock from "./components/dock";
import WindowComponent from "./components/window/window";
import useFileSystemhook from "../../sharedHooks/useFileSystem";

const Main = () => {
  const [state, {}] = useProcess();
  const mainFileSystem = useFileSystemhook();

  // omMount load desktop files
  createEffect(() => {
    window.addEventListener("click", deselectAll);
  });

  // the setFile Menu passed in the use Right Click Menu is causing the issue
  // that updates the desktop rendering ... what to do ...
  const { open, position, menus } = useRightClickMenu(
    mainFileSystem.setCurrentFiles,
    "MainDesktop"
  );

  const { deselectAll, setFocus } = useSelectFile("align-center-desktop");

  return (
    <>
      <Menubar />
      <div class="mainDesktop" id="mainDesktop">
        {/* <OnClickDragBox height={height} left={left} top={top} width={width} /> */}

        {/* context is the current file path where mouse is positioned  */}
        <CustomMenu open={open} position={position} menus={menus} />
        <For each={mainFileSystem.currentFiles}>
          {(file) => (
            <FileEntry
              className={"align-center-desktop"}
              name={file.name}
              iconPath={file.iconPath}
              id={file.id}
              setFocus={setFocus}
              filePath={file.filePath}
              dir={file.dir}
            ></FileEntry>
          )}
        </For>

        <For each={state}>
          {(process, _i) => (
            <WindowComponent
              process={process.process}
              processName={process.processName!}
              dimension={process.dimension!}
              id={process.id!}
            />
          )}
        </For>
        <Dock />
      </div>
    </>
  );
};

export default Main;

//https://gist.github.com/clinuxrulz/95e6ce59e08277610d0d07bc5f8b0314
