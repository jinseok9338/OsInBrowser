import {
  createSignal,
  createContext,
  ParentComponent,
  useContext,
  onMount,
  Accessor,
} from "solid-js";

import { FSModule } from "browserfs/dist/node/core/FS";

import bfsJson from "../../fs.bfs.json";

import * as BrowserFS from "browserfs";
import { FileSystemConfiguration } from "browserfs";

type FileSystemContextState = {
  fs: FSModule | null;
};

const FileSystemConfig: FileSystemConfiguration = {
  fs: "OverlayFS",
  options: {
    readable: {
      fs: "HTTPRequest",
      options: {
        index: bfsJson,
      },
    },
    writable: {
      fs: "LocalStorage",
    },
  },
};

const installBFS = () => {
  BrowserFS.install(window);
  BrowserFS.configure(FileSystemConfig, (e) => {
    if (e) {
      throw e;
    }
    console.log("BFS installed");
  });

  let fs = BrowserFS.BFSRequire("fs");
  if (!fs) {
    return null;
  }
  return fs;
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
