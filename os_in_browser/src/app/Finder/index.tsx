import SideBar from "./sidebar";
import FinderMain from "./finderMain";
import { useFileSystem } from "../../context/windowFileSystem";

import { FileDirectoryProvider } from "../../context/FileDirectoryContext";
import { FilesSelectedProvider } from "../../context/FilesSelectedContext";

interface FinderProps {
  directory: string;
}

const Finder = () => {
  const { fs } = useFileSystem();

  return (
    <FileDirectoryProvider>
      <FilesSelectedProvider>
        <div class="box-body">
          <SideBar />
          <FinderMain />
        </div>
        <div class="box-footer"></div>
      </FilesSelectedProvider>
    </FileDirectoryProvider>
  );
};

export default Finder;
