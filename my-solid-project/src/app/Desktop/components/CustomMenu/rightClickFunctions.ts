import { useFileSystem } from "../../../../context/windowFileSystem";

import { Setter } from "solid-js";
import { v4 as uuidv4 } from "uuid";
import { fileType } from "../../../../types/fileSystemType";
import { fsFunction } from "../../../../utils/fsFunction";
import { useFiles } from "../../../../context/FilesContext";

const { getFileType, setIcon } = fsFunction();

export const createTextFile = (
  e: MouseEvent,
  context: string,
  makeFile: (filePath: string, data: any) => void
) => {
  const { fs } = useFileSystem();

  let cd = context;
  let fileNumber = 0;
  let fileName = `${cd}/text${fileNumber == 0 ? "" : fileNumber}.txt`;
  const fileExists = (fileName: string) => fs?.existsSync(fileName);

  while (fileExists(fileName)) {
    fileNumber++;
    fileName = `${cd}/text${fileNumber == 0 ? "" : fileNumber}.txt`;
  }

  console.log(cd, fileName);

  makeFile(fileName, "");
};
