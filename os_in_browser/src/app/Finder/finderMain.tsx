import { For } from "solid-js";
import { useFileDirectory } from "../../context/FileDirectoryContext";

import useSelectFile from "../../sharedComponents/FileEntry/useSelectFile";
import { useFileSystem } from "../../context/windowFileSystem";

import FileEntry from "../../sharedComponents/FileEntry";
import { useFileSystemHookType } from "../../types/fileSystemType";

interface FinderMainProps {
  fileSystem: useFileSystemHookType;
}

const FinderMain = ({ fileSystem }: FinderMainProps) => {
  const { deselectAll, setFocus } = useSelectFile("align-center-finder");

  const { fs } = useFileSystem();

  return (
    <div
      class="box-main"
      id={fileSystem.currentDirectory()}
      onClick={(e) => {
        if ((e.target! as HTMLElement).classList.contains("box-main")) {
          deselectAll();
        }
      }}
    >
      <For each={fileSystem.currentFiles}>
        {(item, index) => (
          <FileEntry
            name={item.name}
            className="align-center-finder"
            dir={item.dir}
            filePath={item.filePath}
            setFocus={setFocus}
            iconPath={item.iconPath}
            id={item.id}
            ChangeFileName={fileSystem.changeFileName}
            readDir={fileSystem.readdirSync}
          />
        )}
      </For>
    </div>
  );
};

export default FinderMain;
