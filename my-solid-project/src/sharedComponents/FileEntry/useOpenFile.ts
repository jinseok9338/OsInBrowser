import { useFiles } from "../../context/FilesContext";

const useOpenFile = (filePath: string) => {
  const { readFile } = useFiles();

  const openFile = () => {
    let buffer = readFile(filePath);
  };

  return { openFile };
};

export default useOpenFile;
