import { createContext, useContext, ParentComponent } from "solid-js";
import { createStore } from "solid-js/store";
import {
  Dimension,
  ProcessesContextValue,
  ProcessState,
} from "../types/processDirectory";

const defaultState = [] as unknown as ProcessState[];

const ProcessesContext = createContext<ProcessesContextValue>([
  defaultState,
  {
    addProcess: () => undefined,
    deleteProcess: () => undefined,
    changeProcessDimension: () => undefined,
  },
]);

export const ProcessDirectoryProvider: ParentComponent<{
  color?: string;
  title?: string;
}> = (props) => {
  const [state, setState] = createStore([
    {
      active: false,
      iconPath: "",
      dimension: {
        heigth: 500,
        left: 0,
        top: 100,
        width: 500,
      },
      id: "sadasd",
      tempDimension: undefined,
      isFullSize: false,
      process: <h1>{"Hello"}</h1>,
      processName: "Hellow world",
    },
  ] as ProcessState[]);

  const addProcess = (id: string) => {
    console.log("this works");
  }; // Place Holder for now
  const deleteProcess = (id: string) => {};

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

  return (
    <ProcessesContext.Provider
      value={[state, { addProcess, deleteProcess, changeProcessDimension }]}
    >
      {props.children}
    </ProcessesContext.Provider>
  );
};

export const useProcess = () => useContext(ProcessesContext);
