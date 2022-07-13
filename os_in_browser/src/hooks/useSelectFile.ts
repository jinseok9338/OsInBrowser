import { createSignal, createEffect } from "solid-js";

//Make it into hook and share it across the components
const useSelectFile = (className: string) => {
  const [filesSelected, setFilesSelected] = createSignal<string[]>([]); // this will store the number of icons that can be focused

  let icons = document.getElementsByClassName(className);

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

  return { setFocus, deselectAll };
};

export default useSelectFile;
