import { For, createSignal, createEffect } from "solid-js";

import { useProcess } from "../../context/processDirectory";

import { useFileSystem } from "../../context/windowFileSystem";
import useRightClickMenu from "../../hooks/useRightClickMenu";
import CustomMenu from "./components/CustomMenu";

import { fileType } from "../../context/FileDirectoryContext";
import { setIcon } from "../Finder/finderFunction/setIcon";

import FileEntry from "../../sharedComponents/FileEntry";
import useSelectFile from "../../hooks/useSelectFile";
import { v4 as uuidv4 } from "uuid";
import Menubar from "./components/menubar";
import Dock from "./components/dock";
import WindowComponent from "./components/window/window";

const Main = () => {
  const [state, {}] = useProcess();

  const { fs } = useFileSystem();
  const [files, setFiles] = createSignal<fileType[]>([] as fileType[]);

  // omMount load desktop files
  createEffect(() => {
    window.addEventListener("click", deselectAll);
    const cd = "/home/desktop";
    const cFiles = fs?.readdirSync(cd);

    const cFilesWithIcon = cFiles?.map((value) => ({
      name: value,
      iconPath: setIcon(value),
      id: uuidv4(),
      filePath: `${cd}/${value}`,
      dir: cd,
    }));

    setFiles(cFilesWithIcon!);
  });

  // the setFile Menu passed in the use Right Click Menu is causing the issue
  // that updates the desktop rendering ... what to do ...
  const { open, position, menus } = useRightClickMenu(setFiles);

  const { deselectAll, setFocus } = useSelectFile("align-center-desktop");

  return (
    <>
      <Menubar />
      <div class="mainDesktop" id="mainDesktop">
        {/* <OnClickDragBox height={height} left={left} top={top} width={width} /> */}

        {/* context is the current file path where mouse is positioned  */}
        <CustomMenu open={open} position={position} menus={menus} />
        <For each={files()}>
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
