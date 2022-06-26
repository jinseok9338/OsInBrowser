import { createContext, useContext, ParentComponent } from "solid-js";
import { createStore } from "solid-js/store";
import { ProcessesContextValue, ProcessState } from "../types/processDirectory";

const defaultState = [] as unknown as ProcessState[];

const ProcessesContext = createContext<ProcessesContextValue>([
  defaultState,
  {
    addProcess: () => undefined,
    deleteProcess: () => undefined,
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
        top: 0,
        width: 500,
      },
      id: "sadasd",
      tempDimension: null,
      isFullSize: false,
      process: <h1>{"Hello"}</h1>,
      processName: "Hellow world",
    },
  ] as unknown as ProcessState[]);

  const addProcess = (id: string) => {
    console.log("this works");
  }; // Place Holder for now
  const deleteProcess = (id: string) => {};

  return (
    <ProcessesContext.Provider value={[state, { addProcess, deleteProcess }]}>
      {props.children}
    </ProcessesContext.Provider>
  );
};

export const useProcess = () => useContext(ProcessesContext);
