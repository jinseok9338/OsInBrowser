import SideBar from "./sidebar";
import FinderMain from "./finderMain";
import { useFileSystem } from "../../context/windowFileSystem";

import { FileDirectoryProvider } from "../../context/FileDirectoryContext";

const Finder = () => {
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
