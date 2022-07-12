import { For, onMount, createEffect, createSignal } from "solid-js";
import { onCleanup } from "solid-js";
import Desktop from "./components/desktop";
import WindowComponent from "./components/window";
import { useProcess } from "./context/processDirectory";
import OnClickDragBox from "./components/onClickDrag";
import useMakeBox from "./hooks/useMakeBox";
import { useFileSystem } from "./context/windowFileSystem";
import useRightClickMenu from "./hooks/useRightClickMenu";
import { OpenProgrammatically } from "./components/DropDownMenus/example";
import CustomMenu from "./components/CustomMenu";
import { createStore } from "solid-js/store";
import { DIRECTORY_LIST } from "./utils/constants";
import Finder from "./app/Finder";
import { fileType, useFileDirectory } from "./context/FileDirectoryContext";
import { setIcon } from "./app/Finder/finderFunction/setIcon";
import { FileEntry } from "./app/Finder/fileEntry";
import { FileEntryForDesktop } from "./components/FileEntry";

const Main = () => {
  const [state, { addProcess, deleteProcess, changeProcessDimension }] =
    useProcess();

  const { fs } = useFileSystem();
  const [files, setFiles] = createSignal<fileType[]>([] as fileType[]);

  // omMount load desktop files
  onMount(() => {
    const cd = "/home/desktop";
    const cFiles = fs?.readdirSync(cd);

    const cFilesWithIcon = cFiles?.map((value) => ({
      name: value,
      path: setIcon(value),
    }));

    console.log(cFilesWithIcon);
    setFiles(cFilesWithIcon!);
  });

  const { open, position, menus, createFile } = useRightClickMenu(setFiles);

  // load the directory files whenever the files changed... How do I implement this
  // we need better context that can hold the files and share among components
  // createEffect(() => {
  //   let cd = "/home/desktop";

  //   let filesFromDir = fs!.readdirSync(cd);

  //   onCleanup(() => {
  //     setFiles(filesFromDir);
  //     console.log(files());
  //   });
  // });

  return (
    <Desktop>
      {/* <OnClickDragBox height={height} left={left} top={top} width={width} /> */}

      <CustomMenu
        open={open}
        position={position}
        menus={menus}
        onClick={createFile}
      />
      {/* <For each={files()}>
        {(file) => (
          <FileEntryForDesktop
            name={file.name}
            path={file.path}
          ></FileEntryForDesktop>
        )}
      </For> */}

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
    </Desktop>
  );
};

export default Main;

//https://gist.github.com/clinuxrulz/95e6ce59e08277610d0d07bc5f8b0314
