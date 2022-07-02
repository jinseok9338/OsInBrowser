import useFileInfo from "../../hooks/useFileInfo"
import { finderFunction } from "./finderFunction";
import air from "./images/apps/air.png";

interface FileEntryProps {
    name: string,
    path: string
}

export const FileEntry = ({name, path}: FileEntryProps) =>{
    const {icon, pid} = useFileInfo(path)
    const { setFocus, deselectAll } = finderFunction();

    return (
        <div id="sidebar-airdrop" class="app-layout hide">
        <div
          class="align-center"
          id={pid.toString()}
          onclick={(e) => {
            e.stopPropagation();
            setFocus(pid.toString(), e);
          }}
        >
          <img class="img" src={path} alt={path} />
          {name} 
        </div>
      </div>
    )
}