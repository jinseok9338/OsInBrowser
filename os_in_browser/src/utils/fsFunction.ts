import { useFileSystem } from "../context/windowFileSystem";

export const fsFunction = () => {
  const { fs } = useFileSystem();

  /**
   * It returns the contents of a directory, or an empty array if it fails
   * @param {string} cd - current directory
   * @returns An array of file name in string
   */
  const readdirSync = (cd: string) => {
    try {
      return fs!.readdirSync(cd);
    } catch (e) {
      console.log(e);
      return [];
    }
  };

  /**
   * It returns the contents of a file in Buffer, or an empty Buffer if if the content is undefined
   * @param {string} filePath - filePath
   * @returns Buffer
   */
  const readFileSync = (filePath: string) => {
    let fileContent = fs?.readFileSync(filePath);
    return !fileContent ? Buffer.from("") : fileContent;
  };

  /*
   * Renaming the file and returning the new file name.
   * @param {string} oldFilePath - oldFilePath  {string} newFilePath - newFilePath
   * @returns FileName in string
   */
  const renameFile = (oldFilePath: string, newFilePath: string) => {
    fs?.renameSync(oldFilePath, newFilePath);
    let newFile = readFileSync(newFilePath);
    if (newFile.length == 0) {
      console.log("the file is not upated properly");
      return oldFilePath;
    } else {
      return newFilePath;
    }
  };

  /**
   * It creates a file at the given path with the given data
   * @param {string} cd - the current directory
   * @param {string} filePath - the path to the file you want to create
   * @param [data] - the data to be written to the file
   */
  const makefile = (cd: string, filePath: string, data: any = "") => {
    try {
      fs?.writeFileSync(filePath, data);
    } catch (e) {
      console.log(e);
      throw `failed to create ${filePath}`;
    }
  };

  return {
    readdirSync,
    readFileSync,
    renameFile,
    makefile,
  };
};
