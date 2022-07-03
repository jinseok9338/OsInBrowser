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

export const FileSystemProvider: ParentComponent<{}> = (props) => {
  const [fs, setFs] = createSignal<FSModule | null>(installBFS());

  return (
    <FileSystemContext.Provider value={{ fs: fs() }}>
      {props.children}
    </FileSystemContext.Provider>
  );
};

export const useFileSystem = () => useContext(FileSystemContext);
