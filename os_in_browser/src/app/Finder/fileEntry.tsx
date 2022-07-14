import { useFilesSelected } from "../../context/FilesSelectedContext";
import { createEffect, onCleanup, Accessor } from "solid-js";
interface FileEntryProps {
  name: string;
  path: string;
  setFocus: (name: string, e: MouseEvent) => void;
  id: string;
}

export const FileEntry = ({ name, path, setFocus, id }: FileEntryProps) => {
  // const {icon, pid} = useFileInfo(path)

  return (
    <div class="app-layout">
      <div
        class="align-center-finder"
        id={name}
        onClick={(e) => {
          setFocus(id, e);
        }}
      >
        <img src={path} alt={path} />
        <span>{name}</span>
      </div>
    </div>
  );
};
