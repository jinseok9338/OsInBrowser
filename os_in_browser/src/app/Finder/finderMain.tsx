import { FSModule } from "browserfs/dist/node/core/FS";

import { For, createEffect, createMemo, createSignal, onMount } from "solid-js";
import { fileType, useFileDirectory } from "../../context/FileDirectoryContext";

import { FileEntry } from "./fileEntry";
import useSelectFile from "../../hooks/useSelectFile";
import { useFileSystem } from "../../context/windowFileSystem";
import { setIcon } from "./finderFunction/setIcon";
import { FileType } from "browserfs/dist/node/core/node_fs_stats";
import { FileEntryForDesktop } from "../../components/FileEntry";

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

  const { deselectAll, setFocus } = useSelectFile("align-center-finder");

  const { fs } = useFileSystem();

  return (
    <div
      class="box-main"
      id={currentDirectory.currentDirectory}
      onClick={(e) => {
        if ((e.target! as HTMLElement).classList.contains("box-main")) {
          deselectAll();
        }
      }}
    >
      <For each={currentFiles.currentFiles}>
        {(item, index) => (
          <FileEntryForDesktop
            name={item.name}
            className="align-center-finder"
            dir={item.dir}
            filePath={item.filePath}
            setFocus={setFocus}
            iconPath={item.iconPath}
            id={item.id}
          />
        )}
      </For>
    </div>
  );
};

export default FinderMain;
