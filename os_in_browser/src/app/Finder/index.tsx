import SideBar from "./sidebar";
import FinderMain from "./finderMain";
import { createSignal, createEffect } from "solid-js";

import { FileDirectoryProvider } from "../../context/FileDirectoryContext";
import { mainFileSystem } from "../../sharedHooks/useFileSystem";
const Finder = () => {
  const [cd, setCd] = createSignal("");

  createEffect(() => {});

  return (
    <FileDirectoryProvider>
      <div class="box-body">
        <SideBar />
        <FinderMain />
      </div>
      <div class="box-footer"></div>
    </FileDirectoryProvider>
  );
};

export default Finder;
