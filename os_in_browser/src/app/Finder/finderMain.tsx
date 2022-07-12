import { FSModule } from "browserfs/dist/node/core/FS";

import { For } from "solid-js";
import { useFileDirectory } from "../../context/FileDirectoryContext";

import { FileEntry } from "./fileEntry";
import { finderFunction } from "./finderFunction/finderFunction";

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

  const { deselectAll, setFocus } = finderFunction();

  return (
    <div
      class="box-main"
      id="main-box"
      onClick={(e) => {
        if (!(e.target! as HTMLElement).classList.contains("align-center")) {
          deselectAll();
        }
      }}
    >
      <For each={currentFiles.currentFiles}>
        {(item, index) => (
          <FileEntry name={item.name} path={item.path} setFocus={setFocus} />
        )}
      </For>
    </div>
  );
};

export default FinderMain;
