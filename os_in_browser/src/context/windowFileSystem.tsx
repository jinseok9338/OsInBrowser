import {
  createSignal,
  createContext,
  ParentComponent,
  useContext,
  onMount,
} from "solid-js";

import { FSModule } from "browserfs/dist/node/core/FS";

import { installBFS } from "../utils/installBFS";
import { DIRECTORY_LIST } from "../utils/constants";

type FileSystemContextState = {
  fs: FSModule | null;
};

const FileSystemContext = createContext<FileSystemContextState>({
  fs: installBFS(),
} as FileSystemContextState);

export const FileSystemProvider: ParentComponent = (props) => {
  onMount(() => {
    DIRECTORY_LIST.forEach((dir) => {
      try {
        console.log(FileSystemContext.defaultValue.fs?.readdirSync("/home"));
      } catch (e) {
        // the dir already exists
        console.log(e);

        return;
      }
    });
  });

  return (
    <FileSystemContext.Provider value={FileSystemContext.defaultValue}>
      {props.children}
    </FileSystemContext.Provider>
  );
};

export const useFileSystem = () => useContext(FileSystemContext);
