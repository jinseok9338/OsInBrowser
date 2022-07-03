import BrowserFS from "browserfs";

const BFSOption = {
  "/recents": { fs: "InMemory" },
  "/home/apps": { fs: "LocalStorage" },
  "/home/folder": { fs: "LocalStorage" },
  "/home/desktop": { fs: "LocalStorage" },
  "/home/documents": { fs: "LocalStorage" },
  "/home/downlaods": { fs: "LocalStorage" },
  "/home/pictures": { fs: "LocalStorage" },
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
      console.log("installed");
    }
  );

  let fs = BrowserFS.BFSRequire("fs");
  return fs;
};
