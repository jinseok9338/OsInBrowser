import {
  createSignal,
  createEffect,
  onMount,
  Accessor,
  createContext,
  ParentComponent,
  useContext,
} from "solid-js";

import { FSModule } from "browserfs/dist/node/core/FS";
import BrowserFS from "browserfs";

type FileSystemContextState = {
  fs: FSModule | null;
};

const installBFS = () => {
  BrowserFS.install(window);
  BrowserFS.configure(
    {
      fs: "LocalStorage",
    },
    (e) => {
      if (e) {
        throw e;
      }
      console.log("installed");
    }
  );

  let fs = BrowserFS.BFSRequire("fs");
  return fs;
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
