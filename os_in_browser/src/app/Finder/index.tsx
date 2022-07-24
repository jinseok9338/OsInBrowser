import SideBar from "./sidebar";
import FinderMain from "./finderMain";
import { createSignal } from "solid-js";
import useFileSystemhook from "../../sharedHooks/useFileSystem";
import DragAndDrop from "../../sharedComponents/FileDragDrop/drag-drop";
import { config } from "../../utils/constants";
const Finder = () => {
  const [cd, setCd] = createSignal("/home/desktop");

  const fileSytem = useFileSystemhook(cd());

  const finderDirectory = (cd: string) => {
    //remove the first /
    let temp = cd.substring(1, cd.length);
    //replace "/" with " 🡆 "
    let result = temp.replaceAll("/", " 🡆 ");
    return result;
  };

  return (
    <>
      <div class="box-body">
        <SideBar fileSystem={fileSytem} setCd={setCd} cd={cd} />
        <DragAndDrop
          makeFile={fileSytem.makeFile}
          className={"finder"}
          cd={cd}
          config={config}
        >
          <FinderMain fileSystem={fileSytem} />
        </DragAndDrop>
      </div>
      <div class="box-footer" style={{ "padding-left": "1rem" }}>
        <span style={{ "font-size": "0.8rem" }}>{finderDirectory(cd())}</span>
      </div>
    </>
  );
};

export default Finder;
