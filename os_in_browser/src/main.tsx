import { For } from "solid-js";
import Desktop from "./components/desktop";
import WindowComponent from "./components/window";
import { useProcess } from "./context/processDirectory";
import OnClickDragBox from "./components/onClickDrag";
import useMakeBox from "./hooks/useMakeBox";
import { useFileSystem } from "./context/windowFileSystem";
import useRightClickMenu from "./hooks/useRightClickMenu";
import { OpenProgrammatically } from "./components/DropDownMenus/example";
import CustomMenu from "./components/CustomMenu";

const Main = () => {
  const [state, { addProcess, deleteProcess, changeProcessDimension }] =
    useProcess();
  const { open, position } = useRightClickMenu();

  return (
    <Desktop>
      {/* <OnClickDragBox height={height} left={left} top={top} width={width} /> */}

      <CustomMenu open={open} position={position} />

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
