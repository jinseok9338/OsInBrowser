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
}

const FileUploader = ({
  setLoaderState,
  loaderState,
  children,
}: FileUploaderProps) => {
  const processDrop = (files: Blob[]) => {
    //Simulate async request for file upload
    // this is where the file upload logic goes

    setTimeout(() => {
      setLoaderState(FILE_UPLOADER_STATE.PROCESSING);
    }, 10000);
    setTimeout(() => {
      setLoaderState(FILE_UPLOADER_STATE.SUCCESS);
    }, 10000);
  };

  return (
    <>
      {loaderState() === FILE_UPLOADER_STATE.INIT && (
        <DragAndDrop processDrop={processDrop} config={config}>
          {children}
        </DragAndDrop>
      )}
    </>
  );
};

export default FileUploader;
