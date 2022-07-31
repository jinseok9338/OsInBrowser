import { useFileSystem } from "../context/windowFileSystem";
import { IMAGE_FILE_EXTENSIONS, TEXT_FORMAT } from "./constants";
import folder from "../assets/images/apps/folder.png";
import picture from "../assets/images/apps/picture.png";
import unknown from "../assets/images/apps/unknown.png";
import textEdit from "../assets/images/apps/textedit.png";
import { fileType } from "../types/fileSystemType";

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
    let fileContent = fs?.readFileSync(filePath) as unknown as string;
    return !fileContent ? "" : fileContent;
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
      console.log("files created");
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
    let ext = getExtension(directory)?.toString();
    // need to check if undefined is a directory or not

    switch (true) {
      case ext == undefined: {
        return "folder";
      }
      case ext == "url": {
        return "url";
      }
      case IMAGE_FILE_EXTENSIONS.includes(ext?.toLowerCase()!): {
        return "image";
      }
      case TEXT_FORMAT.includes(ext?.toLowerCase()!): {
        return "text";
      }
      default:
        return "unknown";
    }
  };

  const makeShortCutData = (file: fileType): string => `
  [InternetShortcut]
  id=${file.filetype}
  Comment=${"The comment was created automatically"}
  IconFile=${file.iconPath}
  `;

  const setIcon = (filetype: string, iconPath?: string) => {
    switch (filetype) {
      case "folder":
        return folder;
      case "image":
        return picture;
      case "text":
        return textEdit;
      // case "url":
      //   return getUrlIcon();
      default:
        return unknown;
    }
  };

  /**
   * It creates a folder in the current directory.
   * @param {string} folderName - The name of the folder you want to create.
   */
  const makedir = (folderName: string) => {
    fs?.mkdirSync(folderName);
  };

  /**
   * It returns true if the file exists, and false if it doesn't
   * @param {string} path - The path to the file or directory.
   * @returns A boolean value.
   */
  const exists = (path: string) => {
    const result = fs?.existsSync(path);
    return result ? true : false;
  };

  const readShortCut = (filePath: string): { [key: string]: any } => {
    let result: { [key: string]: any } = {};
    const data = fs?.readFileSync(filePath);
    if (data) {
      //read shortCut data one by one and extract the file info
      let allrows = (data as unknown as string).split("\n");
      for (let row in allrows) {
        let patterns = /(\s*.*)=(\s*.*)/.exec(row);
        if (patterns) {
          let key = patterns[1].trim();
          let value = patterns[2].trim();
          result.key = value;
        }
      }
    }
    return result;
  };

  return {
    exists,
    readdirSync,
    readFileSync,
    renameFile,
    makefile,
    deletefile,
    makedir,
    setIcon,
    getFileType,
    makeShortCutData,
    readShortCut,
  };
};
