import { createContext, useContext, ParentComponent } from "solid-js";
import { createStore } from "solid-js/store";
import { finderMetaData } from "../app/Finder/metadata";
import { V86MetaData } from "../app/V86/metaData";
import {
  Dimension,
  ProcessesContextValue,
  ProcessState,
} from "../types/processDirectory";
import { ProcessExists } from "../utils/processes";
import { useFiles } from "./FilesContext";

//import file system from parent context

const defaultState = [] as ProcessState[];

const ProcessesContext = createContext<ProcessesContextValue>([
  defaultState,
  {
    addProcess: () => undefined,
    deleteProcess: () => undefined,
    changeProcessDimension: () => undefined,
    enlarge: () => undefined,
    changeActive: () => undefined,
    shrink: () => undefined,
    openFile: () => undefined,
  },
]);

export const ProcessDirectoryProvider: ParentComponent = (props) => {
  const [state, setState] = createStore([] as ProcessState[]);

  const FilesContext = useFiles();

  const addProcess = (id: string, url?: string) => {
    if (ProcessExists(state, id)) {
      return;
    }
    let process = processesDirectory(url).find((process) => process.id == id);
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
            isShrunk: process.isShrunk,
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
              height: window.innerHeight,
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
            isShrunk: process.isShrunk,
          } as ProcessState;
        } else {
          return process;
        }
      });
      setState(newState);
    }
  };

  const shrink = (id: string) => {
    const newState = state.map((process) => {
      if (process.id == id) {
        return {
          ...process,
          isShrunk: !process.isShrunk,
        } as ProcessState;
      } else {
        return process;
      }
    });
    setState(newState);
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

  const openFile = (processId: string, filePath: string) => {
    // if the file type is "folder" add finder and change the directory
    console.log(processId);
    switch (processId) {
      case "finder": {
        // If it is folder open folder
        console.log("folder");
        addProcess(processId);
        FilesContext.setCurrentDirectory(filePath);
        return;
      }

      case "V86": {
        // addProcess("id") // in the process and pass in the url of the file
        // do shortCut stuff
        let blob = FilesContext.readFile(filePath);
        addProcess(processId, filePath);

        return;
      }

      default: {
        let blob = FilesContext.readFile(filePath);

        alert(URL.createObjectURL(blob));
        return;
      }
    }

    let enc = new TextDecoder();
    let str = FilesContext.readFile(filePath);
    console.log(enc.decode(str as unknown as BufferSource));
    alert(enc.decode(str as unknown as BufferSource));
  };

  const processesDirectory = (url?: string) =>
    [
      finderMetaData({
        FilesContext,
        openFile,
        url,
      }),
      V86MetaData(url!),
    ] as ProcessState[];

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
          shrink,
          openFile,
        },
      ]}
    >
      {props.children}
    </ProcessesContext.Provider>
  );
};

export const useProcess = () => useContext(ProcessesContext);
