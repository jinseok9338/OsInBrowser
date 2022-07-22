import { useFileSystem } from "../context/windowFileSystem";
import { IMAGE_FILE_EXTENSIONS, TEXT_FORMAT } from "./constants";
import folder from "../assets/images/apps/folder.png";
import picture from "../assets/images/apps/picture.png";
import unknown from "../assets/images/apps/unknown.png";
import textEdit from "../assets/images/apps/textedit.png";

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

    return newFilePath;
  };

  /**
   * It creates a file at the given path with the given data
   * @param {string} filePath - the path to the file you want to create
   * @param [data] - the data to be written to the file
   */
  const makefile = (filePath: string, data: any = "") => {
    try {
      fs?.writeFileSync(filePath, data);
    } catch (e) {
      console.log(e);
      throw `failed to create ${filePath}`;
    }
  };

  const deletefile = (filePath: string) => {
    try {
      fs?.unlinkSync(filePath);
      console.log(`successfully deleted ${filePath}`);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const getExtension = (directory: string) => {
    return /[.]/.exec(directory) ? /[^.]+$/.exec(directory) : undefined;
  };

  const getFileType = (directory: string) => {
    let iconName = getExtension(directory)?.toString();
    // need to check if undefined is a directory or not
    if (iconName == undefined) {
      // get the folder icon since it's folder
      return "folder";
    }
    if (IMAGE_FILE_EXTENSIONS.includes(iconName)) {
      return "image";
    }
    if (TEXT_FORMAT.includes(iconName)) {
      return "text";
    }

    //this is unoknown type
    return "unknown";
  };

  const setIcon = (filetype: string) => {
    switch (filetype) {
      case "folder":
        return folder;
      case "image":
        return picture;
      case "text":
        return textEdit;
      default:
        return unknown;
    }
  };

  return {
    readdirSync,
    readFileSync,
    renameFile,
    makefile,
    deletefile,

    setIcon,
    getFileType,
  };
};
