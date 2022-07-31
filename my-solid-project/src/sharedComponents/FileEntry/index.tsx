import FileInfo from "./FileInfo";
import { createSignal } from "solid-js";
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
  filetype: string;
  changeDirectory?: () => void;
  readFile: (filePath: string) => string;
  openFile: (processId: string, filePath: string) => void;
  processId: string;
  // this should be hard because when the finder is not open you should open finder and change the cd
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
  filetype,
  processId,
  changeDirectory,
  readFile,
  openFile,
}: FileEntryProps) => {
  // const {icon, pid} = useFileInfo(path)
  const [left, setLeft] = createSignal(0);
  const [top, setTop] = createSignal(0);
  const [inputDisabled, setInputDisabled] = createSignal(true);
  const [fileName, setFileName] = createSignal(name);
  const { fs } = useFileSystem();
  const [FilePath, setFilePath] = createSignal(filePath);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key == "Enter") {
      setInputDisabled(true);
      let newPath = `${dir}/${fileName()}`;
      if (readDir(dir).includes(fileName())) {
        setFileName(name);
        return;
      }

      ChangeFileName(FilePath(), newPath);

      setFilePath(newPath);
    }
  };

  const inputAvaliable = (e: MouseEvent, id: string) => {
    let iconsList = document.getElementsByClassName(className);
    let divElement;

    for (let i = 0; i < iconsList.length; i++) {
      // you have to make sure that there is only one icon
      if (iconsList.item(i)!.id == id) {
        divElement = iconsList.item(i) as HTMLElement;
      }
    }

    if (
      divElement?.style.border != "" &&
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
      onDblClick={() => {
        // need to work on open file with actual apps.. so later
        openFile(processId, FilePath());
      }}
      id={FilePath()}
      onmouseenter={(e) => {
        setLeft(e.offsetX);
        setTop(e.offsetY);

        let fileInfoElement = document.getElementById(
          `fileInfo ${id} ${className}`
        );
        fileInfoElement!.style.visibility = "visible";
        fileInfoElement!.style.transitionDelay = "1.5s";
      }}
      onMouseLeave={() => {
        let fileInfoElement = document.getElementById(
          `fileInfo ${id} ${className}`
        );
        fileInfoElement!.style.visibility = "hidden";
        fileInfoElement!.style.transitionDelay = "0s";
      }}
    >
      <FileInfo
        name={fileName()}
        top={top}
        left={left}
        className={className}
        id={id}
        filePath={FilePath()}
        filetype={filetype}
      />
      <div
        class={className}
        id={FilePath()}
        onclick={(e) => {
          e.stopPropagation();
          setFocus(FilePath(), e);
        }}
      >
        <img
          draggable={false}
          class="iconImg"
          src={iconPath}
          alt={name}
          id={FilePath()}
        />
        <textarea
          class="fileName"
          disabled={inputDisabled()}
          id={`fileInput ${id}`}
          value={fileName()}
          onChange={(e) => setFileName(e.currentTarget.value)}
          onKeyDown={(e) => onKeyDown(e)}
          onBlur={() => {
            let newPath = `${dir}/${fileName()}`;

            ChangeFileName(FilePath(), newPath);

            setFilePath(newPath);
          }}
          ref={() => {
            addEventListener(
              "click",
              (e) => {
                inputAvaliable(e, FilePath());
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
