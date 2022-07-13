import {
  createContext,
  ParentComponent,
  useContext,
  createEffect,
  onCleanup,
  createSignal,
  Accessor,
} from "solid-js";
import { createStore } from "solid-js/store";

type FilesSelectedContextValue = [
  Accessor<string[]>,
  { setFocus: (id: string, e: MouseEvent) => void; deselectAll: () => void }
];

export interface fileType {
  name: string;
  path: string;
}

const FilesSelectedContext = createContext<FilesSelectedContextValue>([
  () => [],
  { setFocus: () => undefined, deselectAll: () => undefined },
]);

export const FilesSelectedProvider: ParentComponent = (props) => {
  const [filesSelected, setFilesSelected] = createSignal<string[]>([]); // this will store the number of icons that can be focused

  let icons = document.getElementsByClassName("align-center");

  createEffect(() => {
    let files = filesSelected();
    for (let i = 0; i < icons!.length; i++) {
      if (files.includes(icons!.item(i)!.id)) {
        (icons!.item(i) as HTMLElement).style.boxShadow =
          "inset 0 0 0 2em rgba(70, 70, 197, 0.151)";
      } else {
        (icons!.item(i) as HTMLElement)!.style.boxShadow = "";
      }
    }

    return filesSelected;
  });

  const setFocus = (id: string, e: MouseEvent) => {
    // when not ctrl select
    if (!e.ctrlKey) {
      select(id);
    } else {
      toggleSelect(id);
    }
  };

  const toggleSelect = (id: string) => {
    if (!filesSelected().includes(id)) {
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
    <FilesSelectedContext.Provider
      value={[filesSelected, { setFocus, deselectAll }]}
    >
      {props.children}
    </FilesSelectedContext.Provider>
  );
};

export const useFilesSelected = () => useContext(FilesSelectedContext);
