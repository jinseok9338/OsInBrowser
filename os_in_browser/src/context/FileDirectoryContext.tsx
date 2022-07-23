import {
  createSignal,
  createContext,
  ParentComponent,
  useContext,
  Accessor,
  createEffect,
  onCleanup,
  onMount,
} from "solid-js";
import { createStore } from "solid-js/store";
import { v4 as uuidv4 } from "uuid";

import { DIRECTORY_LIST } from "../utils/constants";
import { useFileSystem } from "./windowFileSystem";
import { fileType } from "../types/fileSystemType";
import { fsFunction } from "../utils/fsFunction";

type FileDirectoryContextValue = [
  currentDirectory: { currentDirectory: string },
  currentFiles: { currentFiles: fileType[] },
  actions: {
    ChangeDirectory: (directory: string) => void;
    ChangeCurrentFiles: (files: fileType[]) => void;
  }
];

const FileDirectoryContext = createContext<FileDirectoryContextValue>([
  { currentDirectory: "" },
  { currentFiles: [] as fileType[] },
  { ChangeDirectory: () => undefined, ChangeCurrentFiles: () => undefined },
]);

export const FileDirectoryProvider: ParentComponent = (props) => {
  const { fs } = useFileSystem();
  const [currentDirectory, setCurrentDirectory] = createStore({
    currentDirectory: "/home/desktop",
  });

  const [currentFiles, setCurrentFiles] = createStore({
    currentFiles: [] as fileType[],
  });

  const { setIcon, getFileType } = fsFunction();

  createEffect((prev) => {
    try {
      let cd = currentDirectory;

      const filesString = fs!.readdirSync(cd.currentDirectory);
      let files = filesString.sort().map(
        (value) =>
          ({
            name: value,
            iconPath: setIcon(getFileType(value)),
            id: uuidv4(),
            filePath: `${cd.currentDirectory}/${value}`,
            dir: cd.currentDirectory,
            filetype: getFileType(value),
          } as fileType)
      );

      setCurrentFiles({ currentFiles: files });
      return currentFiles;
    } catch (e) {}
  });

  const ChangeDirectory = (directory: string) => {
    setCurrentDirectory({ currentDirectory: directory });
  };

  const ChangeCurrentFiles = (files: fileType[]) => {
    setCurrentFiles({ currentFiles: files });
  };

  return (
    <FileDirectoryContext.Provider
      value={[
        currentDirectory,
        currentFiles,
        { ChangeDirectory, ChangeCurrentFiles },
      ]}
    >
      {props.children}
    </FileDirectoryContext.Provider>
  );
};

export const useFileDirectory = () => useContext(FileDirectoryContext);
