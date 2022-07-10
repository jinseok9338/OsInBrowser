import { For, onMount, createEffect, createSignal } from "solid-js";
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

const Main = () => {
  const [state, { addProcess, deleteProcess, changeProcessDimension }] =
    useProcess();
  const { open, position, menus } = useRightClickMenu();
  const { fs } = useFileSystem();
  const [files, setFiles] = createSignal<string[]>();

  createEffect(() => {
    let cd = "/home/desktop";
    let Files = files();
    fs!.readdir(cd, function (_err, contents) {
      setFiles(contents!);
    });
    return Files;
  });

  const makeTxtFile = () => {
    fs!.writeFile("/home/desktop/new.txt", (e: Error) => {
      if (e) {
        throw e;
      }
      console.log("text file created");
      fs!.readdir("/home/desktop", (e, contents) => {
        if (e) {
          throw e;
        }
        setFiles(contents);
      });
    });
  };

  onMount(() => {
    makeTxtFile();
  });

  return (
    <Desktop>
      {/* <OnClickDragBox height={height} left={left} top={top} width={width} /> */}

      <CustomMenu open={open} position={position} menus={menus} />
      <For each={files()}>{(file) => <div>{file}</div>}</For>
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
