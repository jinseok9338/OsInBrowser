import {
  createSignal,
  createContext,
  ParentComponent,
  useContext,
  Accessor,
  createEffect,
  onCleanup,
  onMount,
  createMemo,
} from "solid-js";
import { createStore } from "solid-js/store";
import { setIcon } from "../app/Finder/finderFunction/setIcon";
import { DIRECTORY_LIST } from "../utils/constants";
import { useFileSystem } from "./windowFileSystem";

type FilesSelectedContextValue = [
  { setFocus: (id: string, e: MouseEvent) => void; deselectAll: () => void }
];

export interface fileType {
  name: string;
  path: string;
}

const FilesSelectedContext = createContext<FilesSelectedContextValue>([
  { setFocus: () => undefined, deselectAll: () => undefined },
]);

export const FilesSelectedProvider: ParentComponent = (props) => {
  const [filesSelected, setFilesSelected] = createStore([] as string[]); // this will store the number of icons that can be focused

  let icons = document.getElementsByClassName("align-center");

  const FileSelected = createMemo(() => {
    console.log(filesSelected);
    for (let i = 0; i < icons!.length; i++) {
      if (filesSelected.includes(icons!.item(i)!.id)) {
        (icons!.item(i) as HTMLElement).style.boxShadow =
          "inset 0 0 0 2em rgba(70, 70, 197, 0.151)";
      } else {
        (icons!.item(i) as HTMLElement)!.style.boxShadow = "";
      }
    }
  });

  createEffect(() => {
    console.log(filesSelected);
    FileSelected();
  });

  const setFocus = (id: string, e: MouseEvent) => {
    // when not ctrl select
    if (!e.ctrlKey) {
      select(id);
    } else {
      toggleSelect(id);
    }
    // when ctrl toggle select
  };

  const toggleSelect = (id: string) => {
    if (!filesSelected.includes(id)) {
      setFilesSelected((prev) => {
        const newlist = [id, ...prev];
        return newlist;
      });
    } else {
      setFilesSelected((prev) => {
        const newList = prev.filter((itemId) => itemId != id);
        return newList;
      });
    }
  };

  const deselectAll = () => {
    setFilesSelected([]);
  };

  const select = (id: string) => {
    setFilesSelected([id]);
  };

  return (
    <FilesSelectedContext.Provider value={[{ setFocus, deselectAll }]}>
      {props.children}
    </FilesSelectedContext.Provider>
  );
};

export const useFilesSelected = () => useContext(FilesSelectedContext);
