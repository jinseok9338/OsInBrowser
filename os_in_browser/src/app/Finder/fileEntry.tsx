import { finderFunction } from "./finderFunction";

interface FileEntryProps {
  name: string;
  path: string;
}

export const FileEntry = ({ name, path }: FileEntryProps) => {
  // const {icon, pid} = useFileInfo(path)
  const { setFocus, deselectAll } = finderFunction();

  return (
    <div id="sidebar-airdrop" class="app-layout hide">
      <div
        class="align-center"
        id={name}
        onclick={(e) => {
          e.stopPropagation();
          setFocus(name, e);
        }}
      >
        <img class="img" src={path} alt={path} />
        {name}
      </div>
    </div>
  );
};
