import { For } from "solid-js";
import useSelectFile from "../../sharedComponents/FileEntry/useSelectFile";
import FileEntry from "../../sharedComponents/FileEntry";
import { FilesContextValue } from "../../context/FilesContext";

interface FinderMainProps {
  fileSystem: FilesContextValue;
}

const FinderMain = ({ fileSystem }: FinderMainProps) => {
  const { deselectAll, setFocus } = useSelectFile("align-center-finder");

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
      <For
        each={
          fileSystem.currentDirectory() == "/home/desktop"
            ? fileSystem.desktopFiles
            : fileSystem.currentFiles
        }
      >
        {(item, index) => (
          <FileEntry
            readFile={fileSystem.readFile}
            filetype={item.filetype}
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
