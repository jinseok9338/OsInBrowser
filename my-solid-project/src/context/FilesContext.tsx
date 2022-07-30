import {
  createSignal,
  createContext,
  ParentComponent,
  useContext,
  Accessor,
  createEffect,
  onMount,
  Setter,
} from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import { v4 as uuidv4 } from "uuid";
import { fileType } from "../types/fileSystemType";
import { fsFunction } from "../utils/fsFunction";
import path, { dirname } from "path";

export type FilesContextValue = {
  currentFiles: fileType[];
  setCurrentFiles: SetStoreFunction<fileType[]>;
  currentDirectory: Accessor<string>;
  changeFileName: (oldPath: string, newPath: string) => void;
  readFile: (filePath: string) => string;
  setCurrentDirectory: Setter<string>;
  makeFile: (filePath: string, data: any) => void;
  readdirSync: (cd: string) => string[];
  deleteFile: (filePath: string) => void;
  desktopFiles: fileType[];
  makeDir: (cd: string) => void;
};

// we need a way to parse the list into object ...
const FilesContext = createContext<FilesContextValue>({
  currentFiles: [],
  setCurrentFiles: () => undefined,
  currentDirectory: (() => undefined) as any,
  changeFileName: (() => undefined) as any,
  readFile: (() => undefined) as any,
  setCurrentDirectory: (() => undefined) as any,
  makeFile: () => undefined,
  readdirSync: () => (() => undefined) as any,
  deleteFile: () => (() => undefined) as any,
  desktopFiles: [],
  makeDir: () => undefined,
});

export const FilesProvider: ParentComponent = (props) => {
  const {
    readFileSync,
    readdirSync,
    renameFile,
    makefile,
    deletefile,
    getFileType,
    setIcon,
    makedir,
    exists,
  } = fsFunction();

  //initialize the files and directory ... but do I need one??
  const [currentDirectory, setCurrentDirectory] = createSignal("/home/desktop");
  const [currentFiles, setCurrentFiles] = createStore([] as fileType[]);
  const [desktopFiles, setDesktopFiles] = createStore([] as fileType[]);

  //change the files depending on the directory that is passed down in the argument
  /* A hook that is called everytime the cd changes. */
  createEffect((prev) => {
    const cd = currentDirectory();
    if (cd != prev) {
      setCurrentDirectory(cd);
      let cFiles = readdirSync(cd)
        .sort()
        .map(
          (file) =>
            ({
              name: file,
              iconPath: setIcon(getFileType(file)),
              id: uuidv4(),
              filePath: `${cd}/${file}`,
              dir: cd,
              filetype: getFileType(file),
            } as fileType)
        );
      setCurrentFiles(cFiles);
    }
    return cd;
  });

  //OnMount set the desktop files first
  onMount(() => {
    const cd = "/home/desktop";
    let cFiles = readdirSync(cd)
      .sort()
      .map(
        (file) =>
          ({
            name: file,
            iconPath: setIcon(getFileType(file)),
            id: uuidv4(),
            filePath: `${cd}/${file}`,
            dir: cd,
            filetype: getFileType(file),
          } as fileType)
      );
    setDesktopFiles(cFiles);
  });

  /**
   * "If the current directory is the desktop, set the desktop files to the files passed in."
   *
   * The function is called in the `useEffect` hook below
   * @param {string} cd - current directory
   * @param {fileType[]} files - fileType[]
   */
  const ifDeskTopSetDesktopFiles = (cd: string, files: fileType[]) => {
    if (cd == "/home/desktop") {
      setDesktopFiles(files);
    }
  };

  /**
   * It takes a directory path as an argument, reads the files in that directory, sorts them
   * alphabetically, and returns an array of objects with the file name, icon path, file type, id, file
   * path, and directory path
   * @param {string} cd - current directory
   * @returns An array of objects that have the following properties:
   *   name: string
   *   iconPath: string
   *   filetype: string
   *   id: string
   *   filePath: string
   *   dir: string
   */
  const setFiles = (cd: string) => {
    const files = readdirSync(cd)
      .sort()
      .map(
        (file) =>
          ({
            name: file,
            iconPath: setIcon(getFileType(file)),
            filetype: getFileType(file),
            id: uuidv4(),
            filePath: `${cd}/${file}`,
            dir: cd,
          } as fileType)
      );
    return files;
  };

  /**
   * It takes two strings, renames a file, and returns a boolean
   * @param {string} oldPath - the path of the file you want to rename
   * @param {string} newPath - the new name of the file
   * @returns The return value is a boolean.
   */
  const changeFileName = (oldPath: string, newPath: string) => {
    let filePath = renameFile(oldPath, newPath);
    const dirName = filePath.substring(0, filePath.lastIndexOf("/"));
    const files = setFiles(dirName);
    setCurrentFiles(files);
    ifDeskTopSetDesktopFiles(dirName, files);
  };

  /**
   * It takes a string as an argument and returns a buffer of the file
   * @param {string} filePath - The path to the file you want to read.
   * @returns the buffer of the file
   */
  const readFile = (filePath: string) => {
    return readFileSync(filePath);
  };

  /**
   * It takes a file path and some data, and then creates a file at that path with that data then set the file signal
   * @param {string} filePath - The path to the file you want to create.
   * @param {any} data - the data you want to write to the file
   */
  const makeFile = (filePath: string, data: any) => {
    makefile(filePath, data);
    // the current direcotory is missing... that's why it never worked...

    const dirName = filePath.substring(0, filePath.lastIndexOf("/")); // this needs to come from the filePath

    const files = setFiles(dirName);
    console.log(dirName, files);
    //if the make file happens in the desktop the current file should not be afftected
    if (dirName == "/home/desktop") {
      ifDeskTopSetDesktopFiles(dirName, files);
      return;
    }
    setCurrentFiles(files);
    // only desktop files should be affected
    ifDeskTopSetDesktopFiles(dirName, files);
  };

  /**
   * It deletes a file and then updates the current files in the state
   * @param {string} filePath - The path of the file to be deleted
   * @returns the current directory.
   */
  const deleteFile = (filePath: string) => {
    let res = deletefile(filePath);
    if (res) {
      const dirName = filePath.substring(0, filePath.lastIndexOf("/"));
      const files = setFiles(dirName);
      setCurrentFiles(files);
      ifDeskTopSetDesktopFiles(dirName, files);
    }
  };

  const makeDir = (cd: string) => {
    let folderNumber = 0;
    let folderName = `${cd}/NewFolder${folderNumber == 0 ? "" : folderNumber}`;

    while (exists(folderName)) {
      folderNumber++;
      folderName = `${cd}/NewFolder${folderNumber == 0 ? "" : folderNumber}`;
    }

    makedir(folderName);

    // set the file
    const files = setFiles(cd);

    if (cd == "/home/desktop") {
      ifDeskTopSetDesktopFiles(cd, files);
      return;
    }

    setCurrentFiles(files);
    ifDeskTopSetDesktopFiles(cd, files);
  };

  return (
    <FilesContext.Provider
      value={{
        currentFiles,
        makeDir,
        setCurrentFiles,
        currentDirectory,
        changeFileName,
        readFile,
        setCurrentDirectory,
        makeFile,
        readdirSync,
        deleteFile,
        desktopFiles,
      }}
    >
      {props.children}
    </FilesContext.Provider>
  );
};

export const useFiles = () => useContext(FilesContext);
