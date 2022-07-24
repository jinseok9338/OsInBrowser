import {
  createSignal,
  createContext,
  ParentComponent,
  useContext,
  onMount,
  Accessor,
} from "solid-js";

import { FSModule } from "browserfs/dist/node/core/FS";

import Index from "../public.json";
import { installBFS } from "../utils/installBFS";
import { DIRECTORY_LIST } from "../utils/constants";
import BrowserFS, { FileSystemConfiguration } from "browserfs";

type FileSystemContextState = {
  fs: Accessor<FSModule | null>;
};

const FileSystemContext = createContext<FileSystemContextState>({
  fs: null,
} as unknown as FileSystemContextState);

const FileSystemConfig: FileSystemConfiguration = {
  fs: "MountableFileSystem",
  options: {
    "/": {
      fs: "OverlayFS",
      options: {
        readable: {
          fs: "HTTPRequest",
          options: Index,
        },
        writable: {
          fs: "IndexedDB",
          options: {
            storeName: "fsStore",
          },
        },
      },
    },
  },
};

export const FileSystemProvider: ParentComponent = (props) => {
  const [fs, setFs] = createSignal<FSModule | null>(null);
  onMount(() => {
    BrowserFS.install(window);
    BrowserFS.configure(FileSystemConfig, (e) => {
      if (e) {
        throw e;
      }
      console.log("BFS installed");
    });

    let fs = BrowserFS.BFSRequire("fs");
    if (!fs) {
      setFs(null);
    }
    setFs(fs);
  });

  return (
    <FileSystemContext.Provider value={{ fs }}>
      {props.children}
    </FileSystemContext.Provider>
  );
};

export const useFileSystem = () => useContext(FileSystemContext);
