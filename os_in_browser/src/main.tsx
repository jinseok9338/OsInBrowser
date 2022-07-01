import { For, onMount } from "solid-js";
import Desktop from "./components/desktop";
import WindowComponent from "./components/window";
import { useProcess } from "./context/processDirectory";
import OnClickDragBox from "./utils/onClickDrag";

const Main = () => {
  const [state, { addProcess, deleteProcess, changeProcessDimension }] =
    useProcess();

  return (
    <Desktop>
      <OnClickDragBox />
      <For each={state}>
        {(process, _i) => (
          <WindowComponent
            process={process.process}
            processName={process.processName!}
            dimension={process.dimension!}
            changeProcessDimension={changeProcessDimension}
            id={process.id!}
          />
        )}
      </For>
    </Desktop>
  );
};

export default Main;

//https://gist.github.com/clinuxrulz/95e6ce59e08277610d0d07bc5f8b0314
