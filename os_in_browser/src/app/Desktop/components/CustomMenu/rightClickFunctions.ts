import { useFileSystem } from "../../../../context/windowFileSystem";

import { Setter } from "solid-js";
import { v4 as uuidv4 } from "uuid";
import { fileType } from "../../../../types/fileSystemType";
import { fsFunction } from "../../../../utils/fsFunction";

const { getFileType, setIcon } = fsFunction();

export const createTextFile = (
  e: MouseEvent,
  setFiles: Setter<fileType[]>,
  context: string
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

  fs?.writeFileSync(fileName, "");
  const filesString = fs?.readdirSync(cd);
  const files = filesString?.sort().map(
    (value) =>
      ({
        name: value,
        filetype: getFileType(value),
        iconPath: setIcon(getFileType(value)),
        id: uuidv4(),
        filePath: fileName, // this is hard coded let's fix it later ...
        dir: cd,
      } as fileType)
  );
  setFiles(files!);
};
