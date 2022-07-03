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

const FileSystemContext = createContext<FileSystemContextState>({
  fs: null,
} as FileSystemContextState);

export const FileSystemProvider: ParentComponent<{}> = (props) => {
  const [fs, setFs] = createSignal<FSModule | null>(null);

  createEffect(() => {
    BrowserFS.install(window);
    BrowserFS.configure(
      {
        fs: "LocalStorage",
      },
      (e) => {
        if (e) {
          throw e;
        }
        let fs = BrowserFS.BFSRequire("fs");
        setFs(fs);
      }
    );
    console.log("installed");
    return setFs;
  });
  // on load  install the BrowserFS

  return (
    <FileSystemContext.Provider value={{ fs: fs() }}>
      {props.children}
    </FileSystemContext.Provider>
  );
};

export const useFileSystem = () => useContext(FileSystemContext);
