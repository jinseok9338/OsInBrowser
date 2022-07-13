import { FSModule } from "browserfs/dist/node/core/FS";

import { For, createSignal } from "solid-js";
import { useFileDirectory } from "../../context/FileDirectoryContext";
import { useFilesSelected } from "../../context/FilesSelectedContext";
import { createStore } from "solid-js/store";
import { FileEntry } from "./fileEntry";

interface FinderMainProps {
  directory?: string;
  fs: FSModule;
}

const FinderMain = () => {
  const [
    currentDirectory,
    currentFiles,
    { ChangeDirectory, ChangeCurrentFiles },
  ] = useFileDirectory();

  const [filesSelected, functions] = useFilesSelected();

  return (
    <div
      class="box-main"
      id="main-box"
      onClick={(e) => {
        if ((e.target! as HTMLElement).classList.contains("box-main")) {
          functions.deselectAll();
        }
      }}
    >
      <For each={currentFiles.currentFiles}>
        {(item, index) => <FileEntry name={item.name} path={item.path} />}
      </For>
    </div>
  );
};

export default FinderMain;
