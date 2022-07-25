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

type FilesContextValue = {
  currentFiles: fileType[];
  setCurrentFiles: SetStoreFunction<fileType[]>;
  currentDirectory: Accessor<string>;
  changeFileName: (oldPath: string, newPath: string) => void;
  readFile: (filePath: string) => Buffer;
  setCurrentDirectory: Setter<string>;
  makeFile: (filePath: string, data: any) => void;
  readdirSync: (cd: string) => string[];
  deleteFile: (filePath: string) => void;
  desktopFiles: fileType[];
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

  const ifDeskTopSetDesktopFiles = (files: fileType[]) => {
    if (currentDirectory() == "/home/desktop") {
      setDesktopFiles(files);
    }
  };

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

    const files = setFiles(currentDirectory());
    setCurrentFiles(files);
    ifDeskTopSetDesktopFiles(files);
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
    const files = setFiles(currentDirectory());
    setCurrentFiles(files);
    ifDeskTopSetDesktopFiles(files);
  };

  /**
   * It deletes a file and then updates the current files in the state
   * @param {string} filePath - The path of the file to be deleted
   * @returns the current directory.
   */
  const deleteFile = (filePath: string) => {
    let res = deletefile(filePath);
    if (res) {
      const files = setFiles(currentDirectory());
      setCurrentFiles(files);
      ifDeskTopSetDesktopFiles(files);
    } else {
      return;
    }
  };

  return (
    <FilesContext.Provider
      value={{
        currentFiles,
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
