import SideBar from "./sidebar";
import FinderMain from "./finderMain";
import { useFileSystem } from "../../context/windowFileSystem";

import { FileDirectoryProvider } from "../../context/FileDirectoryContext";

interface FinderProps {
  directory: string;
}

const Finder = () => {
  const { fs } = useFileSystem();

  return (
    <FileDirectoryProvider>
      <div class="box-body">
        <SideBar />
        <FinderMain fs={fs!} />
      </div>
      <div class="box-footer"></div>
    </FileDirectoryProvider>
  );
};

export default Finder;
