import { For, createSignal, createEffect } from "solid-js";

import { useProcess } from "../../context/processDirectory";

import useRightClickMenu from "./components/CustomMenu/useRightClickMenu";
import CustomMenu from "./components/CustomMenu";

import FileEntry from "../../sharedComponents/FileEntry";
import useSelectFile from "../../sharedComponents/FileEntry/useSelectFile";
import { v4 as uuidv4 } from "uuid";
import Menubar from "./components/menubar";
import Dock from "./components/dock";
import WindowComponent from "./components/window/window";
import { mainFileSystem } from "../../sharedHooks/useFileSystem";
import { config, FILE_UPLOADER_STATE } from "../../utils/constants";

import DragAndDrop from "../../sharedComponents/FileDragDrop/drag-drop";

const Main = () => {
  const [state, {}] = useProcess();
  //this sets the loading state

  const { open, position, menus } = useRightClickMenu(
    mainFileSystem.setCurrentFiles,
    "MainDesktop"
  );
  const [cd, setCd] = createSignal("/home/desktop");
  const { deselectAll, setFocus } = useSelectFile("align-center-desktop");
  // omMount load desktop files
  createEffect(() => {
    window.addEventListener("click", deselectAll);
  });

  return (
    <>
      <Menubar />

      {/* wrap the mainDesktop with the FileUploader */}
      <DragAndDrop
        makeFile={mainFileSystem.makeFile}
        cd={cd}
        className={"deskMain"}
        config={config}
      >
        <div class="mainDesktop" id="mainDesktop">
          {/* context is the current file path where mouse is positioned  */}
          <CustomMenu open={open} position={position} menus={menus} />
          <For each={mainFileSystem.currentFiles}>
            {(file) => (
              <FileEntry
                filetype={file.filetype}
                className={"align-center-desktop"}
                name={file.name}
                iconPath={file.iconPath}
                id={file.id}
                setFocus={setFocus}
                filePath={file.filePath}
                dir={file.dir}
                ChangeFileName={mainFileSystem.changeFileName}
                readDir={mainFileSystem.readdirSync}
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
      </DragAndDrop>
    </>
  );
};

export default Main;

//https://gist.github.com/clinuxrulz/95e6ce59e08277610d0d07bc5f8b0314
