import DragAndDrop from "./drag-drop";
import { createSignal, Setter, Accessor, JSX } from "solid-js";
import { config, FILE_UPLOADER_STATE } from "../../utils/constants";

export interface configType {
  allowedFileFormats: string[];
  fileSizeMBLimit: number;
  filesLimit: number;
}

interface FileUploaderProps {
  setLoaderState: Setter<string>;
  loaderState: Accessor<string>;
  children: JSX.Element;

  makeFile: (filePath: string, data: any) => void;
}

const FileUploader = ({
  setLoaderState,
  loaderState,
  makeFile,
  children,
}: FileUploaderProps) => {
  return (
    <>
      <DragAndDrop makeFile={makeFile} config={config}>
        {children}
      </DragAndDrop>
    </>
  );
};

export default FileUploader;
