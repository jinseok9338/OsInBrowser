import { setIcon } from "../app/Finder/finderFunction/setIcon";
import { fileType } from "../context/FileDirectoryContext";
import { useFileSystem } from "../context/windowFileSystem";
import useFileInfo from "../hooks/useFileInfo";
import { Setter } from "solid-js";
import { v4 as uuidv4 } from "uuid";

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
  const files = filesString?.map((value) => ({
    name: value,
    iconPath: setIcon(value),
    id: uuidv4(),
    filePath: fileName, // this is hard coded let's fix it later ...
    dir: cd,
  }));
  setFiles(files!);
};
