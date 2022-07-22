import SideBar from "./sidebar";
import FinderMain from "./finderMain";
import { createSignal, createEffect } from "solid-js";
import { createStore } from "solid-js/store";

import { FileDirectoryProvider } from "../../context/FileDirectoryContext";
import useFileSystemhook from "../../sharedHooks/useFileSystem";

import { useFileSystemHookType } from "../../types/fileSystemType";
const Finder = () => {
  const [cd, setCd] = createSignal("/home/desktop");

  const fileSytem = useFileSystemhook(cd());

  const finderDirectory = (cd: string) => {
    //remove the first /
    let temp = cd.substring(1, cd.length);
    //replace "/" with " > "
    let result = temp.replaceAll("/", " 🡆 ");
    return result;
  };

  return (
    <>
      <div class="box-body">
        <SideBar fileSystem={fileSytem} setCd={setCd} cd={cd} />
        <FinderMain fileSystem={fileSytem} />
      </div>
      <div class="box-footer" style={{ "padding-left": "1rem" }}>
        <span style={{ "font-size": "0.8rem" }}>{finderDirectory(cd())}</span>
      </div>
    </>
  );
};

export default Finder;
