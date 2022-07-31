import { Setter } from "solid-js";
import { useFiles } from "../../context/FilesContext";
import { useProcess } from "../../context/processDirectory";
import { useFileSystem } from "../../context/windowFileSystem";

const useOpenFile = (
  filePath: string,
  fileType: string,
  addProcess: (id: string) => void,
  setCurrentDirectory: Setter<string>,
  readFile: (filePath: string) => string
) => {
  const openFile = () => {
    let enc = new TextDecoder();
    let str = readFile(filePath);

    alert(enc.decode(str as unknown as BufferSource));
  };

  // check if the file is dir
  if (fileType === "folder") {
    console.log("folder");
    addProcess("finder");
    setCurrentDirectory(filePath);
    return;
  }

  openFile();
};

export default useOpenFile;
