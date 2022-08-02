import WindowComponent from "./components/window/window";
import { For } from "solid-js";
import { ProcessState } from "../../types/processDirectory";

interface StateLoader {
  state: ProcessState[];
}

const StateLoader = ({ state }: StateLoader) => (
  <For each={state}>
    {(process, _i) =>
      process.hasWindow ? (
        <WindowComponent
          process={process.process}
          processName={process.processName!}
          dimension={process.dimension!}
          id={process.id!}
        />
      ) : (
        process.process
      )
    }
  </For>
);

export default StateLoader;
