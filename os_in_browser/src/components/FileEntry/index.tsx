import FileInfo from "./FileInfo";
import { createSignal, onMount, onCleanup } from "solid-js";
import { useFileSystem } from "../../context/windowFileSystem";

interface FileEntryProps {
  name: string;
  iconPath: string;
  filePath: string;
  setFocus: (name: string, e: MouseEvent) => void;
  id: string; // uuid
  dir: string;
  className: string;
}

export const FileEntry = ({
  name,
  iconPath,
  filePath,
  id,
  dir,
  setFocus,
  className,
}: FileEntryProps) => {
  // const {icon, pid} = useFileInfo(path)
  const [left, setLeft] = createSignal(0);
  const [top, setTop] = createSignal(0);
  const [inputDisabled, setInputDisabled] = createSignal(true);
  const [fileName, setFileName] = createSignal(name);
  const { fs } = useFileSystem();
  const [FilePath, setFilePath] = createSignal(filePath);

  const onKeyDown = (e: KeyboardEvent) => {
    console.log(e.key);
    if (e.key == "Enter") {
      setInputDisabled(true);
      ChangeFileName();
    }
  };

  const ChangeFileName = () => {
    let newPath = `${dir}/${fileName()}`; //todo
    fs?.renameSync(FilePath(), newPath);
    setFilePath(newPath);
    console.log("successfully change the file name");
  };

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
    <div
      class="app-layout"
      onmouseenter={(e) => {
        setLeft(e.offsetX);
        setTop(e.offsetY);
        // the absolte position was the problemo...
        // I might be able to tweak some number but I am okay with what I have
        let fileInfoElement = document.getElementById(`fileInfo ${id}`);
        fileInfoElement!.style.visibility = "visible";
        fileInfoElement!.style.transitionDelay = "1.5s";
      }}
      onMouseLeave={() => {
        let fileInfoElement = document.getElementById(`fileInfo ${id}`);
        fileInfoElement!.style.visibility = "hidden";
        fileInfoElement!.style.transitionDelay = "0s";
      }}
      onBlur={() => {
        ChangeFileName();
      }}
    >
      <FileInfo name={name} top={top} left={left} id={id} filePath={filePath} />
      <div
        class={className}
        id={id}
        onclick={(e) => {
          e.stopPropagation();
          setFocus(id, e);
        }}
      >
        <img class="img" src={iconPath} alt={name} />
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
  );
};

export default FileEntry;
