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
  ChangeFileName: (oldPath: string, newPath: string) => void;
  readDir: (currentDirectory: string) => string[];
}

export const FileEntry = ({
  name,
  iconPath,
  filePath,
  id,
  dir,
  setFocus,
  className,
  ChangeFileName,
  readDir,
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
      let newPath = `${dir}/${fileName()}`;
      if (readDir(dir).includes(fileName())) {
        setFileName(name);
        return;
      }

      ChangeFileName(FilePath(), newPath);

      setFilePath(newPath);
      console.log("successfully change the file name");
    }
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
      id={filePath}
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
    >
      <FileInfo
        name={fileName()}
        top={top}
        left={left}
        id={id}
        filePath={FilePath()}
      />
      <div
        class={className}
        id={id}
        onclick={(e) => {
          e.stopPropagation();
          setFocus(id, e);
        }}
      >
        <img class="img" src={iconPath} alt={name} id={filePath} />
        <input
          class="fileName"
          disabled={inputDisabled()}
          id={`fileInput ${id}`}
          value={fileName()}
          type="text"
          onChange={(e) => setFileName(e.currentTarget.value)}
          onKeyDown={(e) => onKeyDown(e)}
          onBlur={() => {
            let newPath = `${dir}/${fileName()}`;

            ChangeFileName(FilePath(), newPath);

            setFilePath(newPath);
            console.log("successfully change the file name");
          }}
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
