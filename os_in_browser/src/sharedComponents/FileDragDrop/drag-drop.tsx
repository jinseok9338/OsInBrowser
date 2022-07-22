import get from "lodash/get";
import { fileValidator, preventBrowserDefaults } from "./drag-drop-util";
import { createSignal, JSX } from "solid-js";
import { configType } from "./fileUploader";
import { useFileSystem } from "../../context/windowFileSystem";

interface DragAndDropProps {
  config: configType;
  children: JSX.Element;
  makeFile: (filePath: string, data: any) => void;
}

const DragAndDrop = ({ config, children, makeFile }: DragAndDropProps) => {
  const [data, setData] = createSignal(Buffer.from(""));
  const { fs } = useFileSystem();

  const [error, setError] = createSignal("");
  const [dragCounter, setDragCounter] = createSignal(0);

  const handleDrag = (e: Event) => {
    preventBrowserDefaults(e);
  };
  const handleDragIn = (e: Event) => {
    preventBrowserDefaults(e);
    setDragCounter((prev) => prev + 1);
  };
  const handleDragOut = (e: Event) => {
    preventBrowserDefaults(e);
    setDragCounter((prev) => prev - 1);
  };
  const handleDrop = (e: Event) => {
    const files = get(e, "dataTransfer.files");
    preventBrowserDefaults(e);

    setError("");
    setDragCounter(0);
    const { isValidFile, errVal } = fileValidator(files, config);
    if (!isValidFile) {
      if (errVal) {
        setError(errVal);
        setData(Buffer.from(""));
        alert(errVal);
      }
      return false;
    }
    console.log(files);
    let fileData = fileReader(files);
    let fileName = files[0].name as string;
    makeFile(`/home/desktop/${fileName}`, fileData);
  };

  const fileReader = (files: FileList) => {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (loadEvt) => {
      setData(Buffer.from(loadEvt.target!.result! as string));
      return Buffer.from(loadEvt.target!.result! as string);
    };
    return Buffer.from("");
  };

  return (
    <div>
      <div
        class={`drag-container`}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {children}
      </div>
    </div>
  );
};

export default DragAndDrop;
