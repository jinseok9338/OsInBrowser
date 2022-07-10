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
      console.log("installed");
    }
  );

  let fs = BrowserFS.BFSRequire("fs");
  return fs;
};
