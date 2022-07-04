import {
  createSignal,
  createContext,
  ParentComponent,
  useContext,
} from "solid-js";

import { FSModule } from "browserfs/dist/node/core/FS";

import { installBFS } from "../utils/installBFS";

type FileSystemContextState = {
  fs: FSModule | null;
};

const FileSystemContext = createContext<FileSystemContextState>({
  fs: installBFS(),
} as FileSystemContextState);

export const FileSystemProvider: ParentComponent = (props) => {
  return (
    <FileSystemContext.Provider value={FileSystemContext.defaultValue}>
      {props.children}
    </FileSystemContext.Provider>
  );
};

export const useFileSystem = () => useContext(FileSystemContext);
