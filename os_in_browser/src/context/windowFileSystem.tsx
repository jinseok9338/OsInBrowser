import {
  createSignal,
  createEffect,
  onMount,
  Accessor,
  createContext,
  ParentComponent,
  useContext,
} from "solid-js";
import * as BrowserFS from "browserfs";
import { FSModule } from "browserfs/dist/node/core/FS";

type FileSystemContextState = {
  fileSystem: FSModule | null;
};

const FileSystemContext = createContext<FileSystemContextState>(
  {} as FileSystemContextState
);

export const FileSystemProvider: ParentComponent = (props) => {
  const [fs, setFs] = createSignal<FSModule | null>(null);

  onMount(() => {
    BrowserFS.install(window);

    BrowserFS.configure(
      {
        fs: "indexedDb",
      },
      () => {
        setFs(BrowserFS.BFSRequire("fs"));
      }
    );
  });
  // on load  install the BrowserFS
  const fileSystem = fs();
  return (
    <FileSystemContext.Provider value={{ fileSystem }}>
      {props.children}
    </FileSystemContext.Provider>
  );
};

export const useFileSystem = () => useContext(FileSystemContext);
