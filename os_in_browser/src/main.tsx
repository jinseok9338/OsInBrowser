import { For } from "solid-js";
import WindowComponent from "./components/window";
import { useProcess } from "./context/processDirectory";

const Main = () => {
  const [state, { addProcess, deleteProcess }] = useProcess();
  return (
    <>
      <For each={state}>
        {(process, i) => (
          <WindowComponent
            process={process.process}
            processName={process.processName!}
          />
        )}
      </For>
    </>
  );
};

export default Main;
