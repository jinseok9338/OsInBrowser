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
  const [state, setState] = createStore({
    currentDirectory: "/home/desktop",
  });

  const ChangeDirectory = (directory: string) => {
    setState({ currentDirectory: directory });
  };

  return (
    <FileDirectoryContext.Provider value={[state, { ChangeDirectory }]}>
      {props.children}
    </FileDirectoryContext.Provider>
  );
};

export const useFileDirectory = () => useContext(FileDirectoryContext);
