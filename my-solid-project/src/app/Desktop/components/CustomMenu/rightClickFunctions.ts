import { useFileSystem } from "../../../../context/windowFileSystem";

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
