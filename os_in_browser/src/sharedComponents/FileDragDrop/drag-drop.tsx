import get from "lodash/get";
import {
  fileReader,
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
    console.log(files);
    let fileData = fileReader(files);
    let fileName = files[0].name as string;
    console.log(cd(), className);
    makeFile(`${cd()}/${fileName}`, fileData); // this needs to change to the current directory
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
