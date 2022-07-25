import { createSignal, createEffect } from "solid-js";
import { useProcess } from "../../context/processDirectory";
import useRightClickMenu from "./components/CustomMenu/useRightClickMenu";
import CustomMenu from "./components/CustomMenu";
import useSelectFile from "../../sharedComponents/FileEntry/useSelectFile";
import Menubar from "./components/menubar";
import Dock from "./components/dock";

import { config } from "../../utils/constants";
import DragAndDrop from "../../sharedComponents/FileDragDrop/drag-drop";
import DesktopFiles from "./desktopFIles";
import StateLoader from "./stateLoader";
import { useFileDirectory } from "../../context/FileDirectoryContext";
import useFileSystemhook from "../../sharedHooks/useFileSystem";

const Main = () => {
  const [state, {}] = useProcess();
  //this sets the loading state
  const mainFileSystem = useFileSystemhook();

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
          <DesktopFiles setFocus={setFocus} mainFileSystem={mainFileSystem} />
          <StateLoader state={state} />
          <Dock />
        </div>
      </DragAndDrop>
    </>
  );
};

export default Main;

//https://gist.github.com/clinuxrulz/95e6ce59e08277610d0d07bc5f8b0314
