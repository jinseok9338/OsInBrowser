import { For } from "solid-js";
import { useFileDirectory } from "../../context/FileDirectoryContext";

import useSelectFile from "../../sharedComponents/FileEntry/useSelectFile";
import { useFileSystem } from "../../context/windowFileSystem";

import FileEntry from "../../sharedComponents/FileEntry";

const FinderMain = () => {
  const [currentDirectory, currentFiles, {}] = useFileDirectory();

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
          <FileEntry
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
