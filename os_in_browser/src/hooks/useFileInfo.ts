import { createEffect, createSignal } from "solid-js";
import { useFileSystem } from "../context/windowFileSystem";
import { IMAGE_FILE_EXTENSIONS } from "../utils/constants";
import { getProcessByFileExtension, getShortCut } from "../utils/filesFunction";

interface FileInfo {
  icon: string;
  pid: string;
}

const useFileInfo = (path: string): FileInfo => {
  const { fs } = useFileSystem();
  const [icon, setIcon] = createSignal("");
  const [pid, setPid] = createSignal("");

  createEffect(() => {
    if (fs) {
      console.log(fs)
      const extension = path.split(".").pop();
      if (extension === ".url") {
        // Do shortCut stuff
        getShortCut(path, fs!).then(({ URL, IconFile }) => {
          setIcon(IconFile);
          setPid(URL);
        });
      } else if (IMAGE_FILE_EXTENSIONS.includes(extension!)) {
        setIcon(path);
        setPid("ImageViewer");
      } else {
        setPid(getProcessByFileExtension(extension!));
      }
    }
  });
return {
    icon: icon(),
    pid: pid(),
  };
};

export default useFileInfo;
