import { For, onMount, createSignal } from "solid-js";
import { onCleanup } from "solid-js";
import Desktop from "./components/desktop";
import WindowComponent from "./components/window";
import { useProcess } from "./context/processDirectory";

import { useFileSystem } from "./context/windowFileSystem";
import useRightClickMenu from "./hooks/useRightClickMenu";
import CustomMenu from "./components/CustomMenu";

import { fileType } from "./context/FileDirectoryContext";
import { setIcon } from "./app/Finder/finderFunction/setIcon";

import { FileEntryForDesktop } from "./components/FileEntry";
import useSelectFile from "./hooks/useSelectFile";
import { v4 as uuidv4 } from "uuid";

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
      iconPath: setIcon(value),
      id: uuidv4(),
      filePath: `${cd}/${value}`,
      dir: cd,
    }));

    setFiles(cFilesWithIcon!);
  });

  const { open, position, menus } = useRightClickMenu(setFiles);
  const { deselectAll, setFocus } = useSelectFile("align-center-desktop");

  onMount(() => {
    window.addEventListener("click", deselectAll);
    onCleanup(() => {
      window.removeEventListener("click", deselectAll);
    });
  });

  return (
    <Desktop>
      {/* <OnClickDragBox height={height} left={left} top={top} width={width} /> */}

      {/* context is the current file path where mouse is positioned  */}
      <CustomMenu open={open} position={position} menus={menus} />
      <For each={files()}>
        {(file) => (
          <FileEntryForDesktop
            className={"align-center-desktop"}
            name={file.name}
            iconPath={file.iconPath}
            id={file.id}
            setFocus={setFocus}
            filePath={file.filePath}
            dir={file.dir}
          ></FileEntryForDesktop>
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
    </Desktop>
  );
};

export default Main;

//https://gist.github.com/clinuxrulz/95e6ce59e08277610d0d07bc5f8b0314
