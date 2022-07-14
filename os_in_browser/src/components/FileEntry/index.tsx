import FileInfo from "./FileInfo";
import { createSignal, onMount, onCleanup } from "solid-js";

interface FileEntryProps {
  name: string;
  path: string;
  setFocus: (name: string, e: MouseEvent) => void;
  id: string; // uuid
}

export const FileEntryForDesktop = ({
  name,
  path,
  id,
  setFocus,
}: FileEntryProps) => {
  // const {icon, pid} = useFileInfo(path)
  const [left, setLeft] = createSignal(0);
  const [top, setTop] = createSignal(0);
  const [inputDisabled, setInputDisabled] = createSignal(true);
  const [fileName, setFileName] = createSignal(name);

  const onKeyDown = (e: KeyboardEvent) => {
    console.log(e.key);
    if (e.key == "Enter") {
      setInputDisabled(true);
      // set the file name to fileName ... tomorrow...
    }
  };

  onMount(() => {
    window.addEventListener("click", () => {
      setInputDisabled(true);
      // set the file name to fileName
    });
    onCleanup(() => {
      window.removeEventListener("click", () => {
        setInputDisabled(true);
        // set the file name to fileName
      });
    });
  });

  const inputAvaliable = (e: MouseEvent, id: string) => {
    let divElement = document.getElementById(`${id}`);

    if (
      divElement?.style.boxShadow != "" &&
      (e.target as HTMLElement).classList.contains("fileName")
    ) {
      setInputDisabled(false);
      (e.target! as HTMLElement).focus();
    } else {
      setInputDisabled(true);
    }
  };

  return (
    <>
      <div
        class="app-layout"
        onmouseenter={(e) => {
          setLeft(e.pageX);
          setTop(e.pageY);
          let fileInfoElement = document.getElementById(`fileInfo ${id}`);
          fileInfoElement!.style.visibility = "visible";
          fileInfoElement!.style.transitionDelay = "1.5s";
        }}
        onMouseLeave={() => {
          let fileInfoElement = document.getElementById(`fileInfo ${id}`);
          fileInfoElement!.style.visibility = "hidden";
          fileInfoElement!.style.transitionDelay = "0s";
        }}
      >
        <FileInfo name={name} top={top} left={left} id={id} />
        <div
          class="align-center-desktop"
          id={id}
          onclick={(e) => {
            e.stopPropagation();
            setFocus(id, e);
          }}
        >
          <img class="img" src={path} alt={path} />
          <input
            class="fileName"
            disabled={inputDisabled()}
            id={`fileInput ${id}`}
            value={fileName()}
            type="text"
            onChange={(e) => setFileName(e.currentTarget.value)}
            onKeyDown={(e) => onKeyDown(e)}
            ref={() => {
              addEventListener(
                "click",
                (e) => {
                  inputAvaliable(e, id);
                },
                true
              );
            }}
          />
        </div>
      </div>
    </>
  );
};
