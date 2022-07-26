import get from "lodash/get";
import {
  fileValidator,
  handleDrag,
  handleDragIn,
  handleDragOut,
  preventBrowserDefaults,
} from "./drag-drop-util";
import { createSignal, JSX, Accessor } from "solid-js";
import { useFileSystem } from "../../context/windowFileSystem";
import { configType } from "../../utils/constants";

interface DragAndDropProps {
  config: configType;
  children: JSX.Element;
  makeFile: (filePath: string, data: any) => void;
  className: string;
  cd: Accessor<string>;
}

const DragAndDrop = ({
  config,
  children,
  makeFile,
  className,
  cd,
}: DragAndDropProps) => {
  const handleDrop = (e: Event) => {
    const files = get(e, "dataTransfer.files");
    preventBrowserDefaults(e);

    const { isValidFile, errVal } = fileValidator(files, config);
    if (!isValidFile) {
      if (errVal) {
        alert(errVal);
      }
      return false;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (loadEvt) => {
      let fileName = files[0].name as string;
      let fileData = loadEvt.target!.result! as ArrayBuffer;
      makeFile(`${cd()}/${fileName}`, fileData);
    };
  };

  return (
    <div
      class={`drag-container ${className}`}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default DragAndDrop;
