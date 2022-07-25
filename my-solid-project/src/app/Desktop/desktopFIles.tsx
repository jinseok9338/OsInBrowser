import { For } from "solid-js";
import FileEntry from "../../sharedComponents/FileEntry";
import { useFileSystemHookType } from "../../types/fileSystemType";

interface DesktopFilesProps {
  setFocus: (id: string, e: MouseEvent) => void;
  mainFileSystem: useFileSystemHookType;
}

const DesktopFiles = ({ setFocus, mainFileSystem }: DesktopFilesProps) => (
  <For each={mainFileSystem.currentFiles}>
    {(file) => (
      <FileEntry
        filetype={file.filetype}
        className={"align-center-desktop"}
        name={file.name}
        iconPath={file.iconPath}
        id={file.id}
        setFocus={setFocus}
        filePath={file.filePath}
        dir={file.dir}
        ChangeFileName={mainFileSystem.changeFileName}
        readDir={mainFileSystem.readdirSync}
      ></FileEntry>
    )}
  </For>
);

export default DesktopFiles;
