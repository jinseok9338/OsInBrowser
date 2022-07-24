import BrowserFS from "browserfs";
import { FileSystemConfiguration } from "browserfs";
import Index from "../public.json";

const FileSystemConfig: FileSystemConfiguration = {
  fs: "OverlayFS",
  options: {
    readable: {
      fs: "XmlHttpRequest",
      options: {
        index: Index,
      },
    },
    writable: {
      fs: "IndexedDB",
      options: {
        storeName: "browser-fs",
      },
    },
  },
};

export const installBFS = () => {
  BrowserFS.install(window);
  BrowserFS.configure(FileSystemConfig, (e) => {
    if (e) {
      throw e;
    }
    console.log("BFS installed");
  });

  let fs = BrowserFS.BFSRequire("fs");
  return fs;
};

//https://www.youtube.com/watch?v=qAuL2t82Y8A&list=PLM88opVjBuU7xSRoHhs3hZBz3JmHHBMMN&index=9
