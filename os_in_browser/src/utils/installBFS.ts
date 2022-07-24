import BrowserFS from "browserfs";

const BFSOption = {
  "/recents": { fs: "InMemory" },
  "/home": { fs: "LocalStorage" },
};

export const installBFS = () => {
  BrowserFS.install(window);
  BrowserFS.configure(
    {
      fs: "MountableFileSystem",
      options: BFSOption,
    },
    (e) => {
      if (e) {
        throw e;
      }
      console.log("BFS installed");
    }
  );

  let fs = BrowserFS.BFSRequire("fs");
  return fs;
};

//https://www.youtube.com/watch?v=qAuL2t82Y8A&list=PLM88opVjBuU7xSRoHhs3hZBz3JmHHBMMN&index=9
