import { onMount } from "solid-js";

const useMoveDock = () => {
  onMount(() => {
    let icons = document.querySelectorAll(".ico");
    let length = icons.length;
    let dock = document
      .getElementsByClassName("dock-container")
      .item(0) as HTMLElement;
    let HtmlElementIcons: HTMLElement[] = [];

    for (let i = 0; i < length; i++) {
      HtmlElementIcons.push(icons.item(i) as HTMLElement);
    }

    const focus = (elem: HTMLElement, index: number, icons: HTMLElement[]) => {
      let previous = index - 1;
      let previous1 = index - 2;
      let next = index + 1;
      let next2 = index + 2;

      if (previous == -1) {
        console.log("first element");
        elem.style.transform = "scale(1.5)  translateY(-10px)";
        icons[next].style.transform = "scale(1.2) translateY(-6px)";
        icons[next2].style.transform = "scale(1.1)";
      } else if (previous1 == -1) {
        // second element
        elem.style.transform = "scale(1.5)  translateY(-10px)";
        icons[previous].style.transform = "scale(1.2) translateY(-6px)";
        icons[next].style.transform = "scale(1.2) translateY(-6px)";
        icons[next2].style.transform = "scale(1.1)";
      } else if (next == icons.length) {
        // last element
        elem.style.transform = "scale(1.5)  translateY(-10px)";
        icons[previous].style.transform = "scale(1.2) translateY(-6px)";
        icons[previous1].style.transform = "scale(1.1)";
        console.log("last element");
      } else if (next == icons.length - 1) {
        // one before the last
        elem.style.transform = "scale(1.5)  translateY(-10px)";
        icons[previous].style.transform = "scale(1.2) translateY(-6px)";
        icons[previous1].style.transform = "scale(1.1)";
        icons[next].style.transform = "scale(1.2) translateY(-6px)";
      } else {
        elem.style.transform = "scale(1.5)  translateY(-10px)";
        icons[previous].style.transform = "scale(1.2) translateY(-6px)";
        icons[previous1].style.transform = "scale(1.1)";
        icons[next].style.transform = "scale(1.2) translateY(-6px)";
        icons[next2].style.transform = "scale(1.1)";
      }
    };

    const moveDock = (e: MouseEvent, dock: HTMLElement) => {
      if (e.pageY > window.innerHeight - 80.0) {
        dock.style.transform = "translateY(0px)";
      } else {
        dock.style.transform = "translateY(70px)";
      }
    };

    HtmlElementIcons.forEach((item, index) => {
      item.addEventListener("mouseover", (e) => {
        focus(e.target as HTMLElement, index, HtmlElementIcons);
      });
      item.addEventListener("mouseleave", (e) => {
        HtmlElementIcons.forEach((item) => {
          item.style.transform = "scale(1)  translateY(0px)";
        });
      });
    });

    window.addEventListener("mousemove", (e) => moveDock(e, dock));
  });
};

export default useMoveDock;
