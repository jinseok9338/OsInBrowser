import { createContext, useContext, ParentComponent } from "solid-js";
import { createStore } from "solid-js/store";
import {
  Dimension,
  ProcessesContextValue,
  ProcessState,
} from "../types/processDirectory";
import { processesDirectory } from "../utils/processes";

const defaultState = [] as ProcessState[];

const ProcessesContext = createContext<ProcessesContextValue>([
  defaultState,
  {
    addProcess: () => undefined,
    deleteProcess: () => undefined,
    changeProcessDimension: () => undefined,
    enlarge: () => undefined,
    changeActive: () => undefined,
  },
]);

export const ProcessDirectoryProvider: ParentComponent<{
  color?: string;
  title?: string;
}> = (props) => {
  const [state, setState] = createStore([] as ProcessState[]);

  const addProcess = (id: string) => {
    let process = processesDirectory.find((process) => (process.id = id));
    let newProcess = {
      ...process,
      active: true,
    } as ProcessState;
    const newProcesses = state.concat([newProcess!]);
    setState(newProcesses);
  };
  const deleteProcess = (id: string) => {
    const newState = state.filter((process) => process.id != id);
    setState(newState);
  };

  const enlarge = (id: string) => {
    const process = state.find((process) => process.id == id);
    if (process?.isFullSize) {
      const newState = state.map((process) => {
        if (process.id == id) {
          return {
            active: process.active,
            dimension: process.tempDimension, // use the temp dimension to get back to the original dimension
            iconPath: process.iconPath,
            id,
            isFullSize: !process.isFullSize,
            process: process.process,
            processName: process.processName,
            tempDimension: undefined,
          } as ProcessState;
        } else {
          return process;
        }
      });
      setState(newState);
    } else {
      // if the window is not full size
      const newState = state.map((process) => {
        if (process.id == id) {
          return {
            active: process.active,
            dimension: {
              heigth: window.innerHeight,
              width: window.innerWidth,
              left: 0,
              top: 0,
            } as Dimension, // use the temp dimension to get back to the original dimension
            iconPath: process.iconPath,
            id,
            isFullSize: !process.isFullSize,
            process: process.process,
            processName: process.processName,
            tempDimension: process.dimension,
          } as ProcessState;
        } else {
          return process;
        }
      });
      setState(newState);
    }
  };

  const changeProcessDimension = (id: string, dimension: Dimension) => {
    const newState: ProcessState[] = state.map((process: ProcessState) => {
      if (process.id == id) {
        return {
          active: process.active,
          iconPath: process.iconPath,
          tempDimension: process.tempDimension,
          dimension,
          id,
          isFullSize: process.isFullSize,
          process: process.process,
          processName: process.processName,
        } as ProcessState;
      } else {
        return process;
      }
    });

    setState(newState);
  };

  const changeActive = (id: string) => {
    const newState: ProcessState[] = state.map((process: ProcessState) => {
      if (process.id == id) {
        return {
          active: !process.active,
          iconPath: process.iconPath,
          tempDimension: process.tempDimension,
          dimension: process.dimension,
          id,
          isFullSize: process.isFullSize,
          process: process.process,
          processName: process.processName,
        } as ProcessState;
      } else {
        return process;
      }
    });

    setState(newState);
  };

  return (
    <ProcessesContext.Provider
      value={[
        state,
        {
          addProcess,
          deleteProcess,
          changeProcessDimension,
          enlarge,
          changeActive,
        },
      ]}
    >
      {props.children}
    </ProcessesContext.Provider>
  );
};

export const useProcess = () => useContext(ProcessesContext);
