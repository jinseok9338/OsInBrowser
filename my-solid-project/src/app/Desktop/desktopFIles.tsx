import { For } from "solid-js";
import { FilesContextValue } from "../../context/FilesContext";
import FileEntry from "../../sharedComponents/FileEntry";

interface DesktopFilesProps {
  setFocus: (id: string, e: MouseEvent) => void;
  mainFileSystem: FilesContextValue;
  openFile: (processId: string, filePath: string) => void;
}

const DesktopFiles = ({
  setFocus,
  mainFileSystem,
  openFile,
}: DesktopFilesProps) => (
  <For each={mainFileSystem.desktopFiles}>
    {(file) => (
      <FileEntry
        processId={file.processId}
        openFile={openFile}
        readFile={mainFileSystem.readFile}
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
