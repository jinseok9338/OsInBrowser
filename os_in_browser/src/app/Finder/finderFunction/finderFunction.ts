import { createEffect, createSignal, onMount } from "solid-js";
import { createStore } from "solid-js/store";
export const finderFunction = () => {
  const [selected, setSelected] = createStore([] as string[]); // this will store the number of icons that can be focused

  createEffect(() => {
    let icons = document.getElementsByClassName("align-center");
    for (let i = 0; i < icons!.length; i++) {
      if (selected.includes(icons!.item(i)!.id)) {
        (icons!.item(i) as HTMLElement).style.boxShadow =
          "inset 0 0 0 2em rgba(70, 70, 197, 0.151)";
      } else {
        (icons!.item(i) as HTMLElement)!.style.boxShadow = "";
      }
    }
    return selected;
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
    if (!selected.includes(id)) {
      setSelected((prev) => {
        return [...prev, id];
      });
    } else {
      setSelected((prev) => {
        return prev.filter((itemId) => itemId != id);
      });
    }
  };

  const deselectAll = () => {
    setSelected([]);
  };

  const select = (id: string) => {
    setSelected([id]);
  };

  return { setFocus, deselectAll };
};
