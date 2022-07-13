import { FSModule } from "browserfs/dist/node/core/FS";

import { For } from "solid-js";
import { useFileDirectory } from "../../context/FileDirectoryContext";
import { useFilesSelected } from "../../context/FilesSelectedContext";

import { FileEntry } from "./fileEntry";

interface FinderMainProps {
  directory?: string;
  fs: FSModule;
}

const FinderMain = ({ directory, fs }: FinderMainProps) => {
  const [
    currentDirectory,
    currentFiles,
    { ChangeDirectory, ChangeCurrentFiles },
  ] = useFileDirectory();

  const [{ deselectAll }] = useFilesSelected();

  return (
    <div
      class="box-main"
      id="main-box"
      onClick={(e) => {
        if ((e.target! as HTMLElement).classList.contains("box-main")) {
          console.log((e.target! as HTMLElement).classList);
          deselectAll();
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
