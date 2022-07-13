import { useFilesSelected } from "../../context/FilesSelectedContext";
import { createEffect, onCleanup, Accessor } from "solid-js";
interface FileEntryProps {
  name: string;
  path: string;
}

export const FileEntry = ({ name, path }: FileEntryProps) => {
  // const {icon, pid} = useFileInfo(path)
  const [filesSelected, functions] = useFilesSelected();

  return (
    <div class="app-layout hide">
      <div
        class="align-center"
        id={name}
        onClick={(e) => {
          functions.setFocus(name, e);
        }}
      >
        <img src={path} alt={path} />
        <span>{name}</span>
      </div>
    </div>
  );
};
