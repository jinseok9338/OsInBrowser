import SideBar from "./sidebar";
import FinderMain from "./finderMain";
import { createSignal } from "solid-js";
import useFileSystemhook from "../../sharedHooks/useFileSystem";
import DragAndDrop from "../../sharedComponents/FileDragDrop/drag-drop";
import { config } from "../../utils/constants";
import { FilesContextValue } from "../../context/FilesContext";

interface FinderProps {
  FilesContext: FilesContextValue;
  openFile: (processId: string, filePath: string) => void;
}

const Finder = ({ FilesContext, openFile }: FinderProps) => {
  const finderDirectory = (cd: string) => {
    //remove the first /
    let temp = cd.substring(1, cd.length);
    //replace "/" with " 🡆 ➡ "
    let result = temp.replaceAll("/", " ➡ ");
    return result;
  };

  return (
    <>
      <div class="box-body">
        <SideBar fileSystem={FilesContext} />
        <DragAndDrop
          makeFile={FilesContext.makeFile}
          className={"finder"}
          config={config}
          cd={FilesContext.currentDirectory}
        >
          <FinderMain fileSystem={FilesContext} openFile={openFile} />
        </DragAndDrop>
      </div>
      <div class="box-footer" style={{ "padding-left": "1rem" }}>
        <span style={{ "font-size": "0.8rem" }}>
          {finderDirectory(FilesContext.currentDirectory())}
        </span>
      </div>
    </>
  );
};

export default Finder;
