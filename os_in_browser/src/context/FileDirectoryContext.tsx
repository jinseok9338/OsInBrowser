import {
  createSignal,
  createContext,
  ParentComponent,
  useContext,
  Accessor,
  createEffect,
  onCleanup,
} from "solid-js";
import { createStore } from "solid-js/store";
import { setIcon } from "../app/Finder/finderFunction/setIcon";
import { useFileSystem } from "./windowFileSystem";

type FileDirectoryContextValue = [
  currentDirectory: { currentDirectory: string },
  currentFiles: { currentFiles: fileType[] },
  actions: {
    ChangeDirectory: (directory: string) => void;
    ChangeCurrentFiles: (files: fileType[]) => void;
  }
];

interface fileType {
  name: string;
  path: string;
}

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

  createEffect(() => {
    let cd = currentDirectory;
    const filesString = fs!.readdirSync(cd.currentDirectory);
    let files = filesString.map((value) => ({
      name: value,
      path: setIcon(value),
    }));

    onCleanup(() => {
      setCurrentFiles({ currentFiles: files });
      console.log(currentFiles);
    });
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
