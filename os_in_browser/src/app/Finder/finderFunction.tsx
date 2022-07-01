import { createEffect, createSignal } from "solid-js";

export const finderFunction = () => {
  const [selected, setSelected] = createSignal<string[]>([]); // this will store the number of icons that can be focused

  // 1. when nothing selected  (selected.length == 0 and moreAvailable)
  // 2. when an icon is selected and you want to focos something else  ( selected.lrength != 0 )
  // 3. when you want to deselect icons (focus.lrength != 0)
  let icons: HTMLCollection = document.getElementsByClassName("align-center");

  createEffect((prev) => {
    for (let i = 0; i < icons.length; i++) {
      if (selected().includes(icons.item(i)!.id)) {
        (icons[i] as HTMLElement).style.boxShadow =
          "inset 0 0 0 2em rgba(70, 70, 197, 0.151)";
      } else {
        (icons.item(i) as HTMLElement)!.style.boxShadow = "";
      }
    }

    return selected();
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
    if (!selected().includes(id)) {
      setSelected((prev) => prev.concat([id]));
      console.log("conacat");
    } else {
      setSelected((prev) => prev.filter((itemId) => itemId != id));
      console.log("filter");
    }
  };

  const deselectAll = (e: MouseEvent) => {
    e.stopPropagation();
    setSelected([]);
  };

  const select = (id: string) => {
    setSelected([id]);
  };

  return { setFocus, deselectAll };
};
