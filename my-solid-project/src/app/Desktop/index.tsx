import { createSignal, createEffect } from "solid-js";
import { useProcess } from "../../context/processDirectory";
import useRightClickMenu from "./components/CustomMenu/useRightClickMenu";
import useSelectFile from "../../sharedComponents/FileEntry/useSelectFile";
import Menubar from "./components/menubar";
import Dock from "./components/dock";
import { config } from "../../utils/constants";
import DragAndDrop from "../../sharedComponents/FileDragDrop/drag-drop";
import DesktopFiles from "./desktopFIles";
import StateLoader from "./stateLoader";

import { useFiles } from "../../context/FilesContext";
import CustomMenu from "./components/CustomMenu/customMenu";
import CircularMenu from "./components/circularMenu";
import PopUpModal from "./components/PopUpModal";

const Main = () => {
  const [state, { openFile }] = useProcess();
  //this sets the loading state
  const mainFileSystem = useFiles();

  const { open, position, menus } = useRightClickMenu();
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
          <DesktopFiles
            setFocus={setFocus}
            mainFileSystem={mainFileSystem}
            openFile={openFile}
          />
          <StateLoader state={state} />
          <CircularMenu />
          <PopUpModal
            description="haha this is the test and if it's successful"
            severity="Error"
            show={false}
          />
          <Dock />
        </div>
      </DragAndDrop>
    </>
  );
};

export default Main;

//https://gist.github.com/clinuxrulz/95e6ce59e08277610d0d07bc5f8b0314
