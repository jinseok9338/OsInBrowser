import { useFilesSelected } from "../../context/FilesSelectedContext";

interface FileEntryProps {
  name: string;
  path: string;
}

export const FileEntry = ({ name, path }: FileEntryProps) => {
  // const {icon, pid} = useFileInfo(path)
  const [{ setFocus }] = useFilesSelected();

  return (
    <div class="app-layout hide">
      <div
        class="align-center"
        id={name}
        onClick={(e) => {
          setFocus(name, e);
        }}
      >
        <img src={path} alt={path} />
        <span>{name}</span>
      </div>
    </div>
  );
};
