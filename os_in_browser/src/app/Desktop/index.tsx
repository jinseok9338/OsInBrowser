import { For, createSignal, createEffect } from "solid-js";

import { useProcess } from "../../context/processDirectory";

import { useFileSystem } from "../../context/windowFileSystem";
import useRightClickMenu from "./components/CustomMenu/useRightClickMenu";
import CustomMenu from "./components/CustomMenu";

import FileEntry from "../../sharedComponents/FileEntry";
import useSelectFile from "../../sharedComponents/FileEntry/useSelectFile";
import { v4 as uuidv4 } from "uuid";
import Menubar from "./components/menubar";
import Dock from "./components/dock";
import WindowComponent from "./components/window/window";
import { mainFileSystem } from "../../sharedHooks/useFileSystem";
import { FILE_UPLOADER_STATE } from "../../utils/constants";
import Loader from "./components/Loader";
import FileUploader from "../../sharedComponents/FileDragDrop/fileUploader";

const Main = () => {
  const [state, {}] = useProcess();
  //this sets the loading state
  const [loaderState, setLoaderState] = createSignal<
    "INIT" | "PROCESSING" | "SUCCESS" | "FAILURE" | string
  >(FILE_UPLOADER_STATE.INIT);

  const { open, position, menus } = useRightClickMenu(
    mainFileSystem.setCurrentFiles,
    "MainDesktop"
  );
  const { deselectAll, setFocus } = useSelectFile("align-center-desktop");
  // omMount load desktop files
  createEffect(() => {
    window.addEventListener("click", deselectAll);
  });

  return (
    <>
      <Menubar />
      <Loader currentState={loaderState()} />
      {/* wrap the mainDesktop with the FileUploader */}
      <FileUploader
        setLoaderState={setLoaderState}
        loaderState={loaderState}
        makeFile={mainFileSystem.makeFile}
      >
        <div class="mainDesktop" id="mainDesktop">
          {/* <OnClickDragBox height={height} left={left} top={top} width={width} /> */}

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
      </FileUploader>
    </>
  );
};

export default Main;

//https://gist.github.com/clinuxrulz/95e6ce59e08277610d0d07bc5f8b0314
