import {
  createSignal,
  createContext,
  ParentComponent,
  useContext,
  Accessor,
} from "solid-js";
import { createStore } from "solid-js/store";

type FileDirectoryContextValue = [
  currentDirectory: { currentDirectory: string },
  actions: { ChangeDirectory: (directory: string) => void }
];

const FileDirectoryContext = createContext<FileDirectoryContextValue>([
  { currentDirectory: "" },
  { ChangeDirectory: () => undefined },
]);

export const FileDirectoryProvider: ParentComponent = (props) => {
  const [currentDirectory, setCurrentDirectory] = createStore({
    currentDirectory: "/home/desktop",
  });

  const ChangeDirectory = (directory: string) => {
    setCurrentDirectory((prev) => {
      console.log(prev.currentDirectory);
      return { ...prev, currentDirectory: directory };
    });
  };

  return (
    <FileDirectoryContext.Provider
      value={[currentDirectory, { ChangeDirectory }]}
    >
      {props.children}
    </FileDirectoryContext.Provider>
  );
};

export const useFileDirectory = () => useContext(FileDirectoryContext);
