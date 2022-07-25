import { useProcess } from "../../context/processDirectory";
import useFileSystemhook from "../../sharedHooks/useFileSystem";

export const useOnDoubleClick = (fileType: string) => {
  const [state, {}] = useProcess();
  const { setCurrentDirectory, currentDirectory } = useFileSystemhook();

  const onDbClick = () => {
    if (fileType == "folder ") {
      // if the finder is not open, open finder and chagne the cd
      //check if the finder id exists...
      //if the finder open just change the cd
    }
  };

  return {
    onDbClick,
  };
};
