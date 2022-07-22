import DragAndDrop from "./drag-drop";
import { createSignal } from "solid-js";

export interface configType {
  allowedFileFormats: string[];
  fileSizeMBLimit: number;
  filesLimit: number;
}

const config = {
  allowedFileFormats: ["image/jpeg", "image/jpg", "image/png"],
  fileSizeMBLimit: 20,
  filesLimit: 1,
};

const FILE_UPLOADER_STATE = {
  INIT: "INIT",
  PROCESSING: "PROCESSING",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const FileUploader = () => {
  const [loaderState, setLoaderState] = createSignal(FILE_UPLOADER_STATE.INIT);
  const processDrop = (files: Blob[]) => {
    //Simulate async request for file upload
    setTimeout(() => {
      setLoaderState(FILE_UPLOADER_STATE.PROCESSING);
    }, 1000);
    setTimeout(() => {
      setLoaderState(FILE_UPLOADER_STATE.SUCCESS);
    }, 3000);
  };
  return (
    <>
      {loaderState() === FILE_UPLOADER_STATE.INIT && (
        <DragAndDrop processDrop={processDrop} config={config}>
          <div>Drag and drop files here</div>
          <div>State machine based on file upload</div>
        </DragAndDrop>
      )}
      {loaderState() === FILE_UPLOADER_STATE.PROCESSING && (
        <div class="drag-container">Processing...</div>
      )}
      {loaderState() === FILE_UPLOADER_STATE.SUCCESS && (
        <div class="drag-container">File Upload done!</div>
      )}
      {loaderState() === FILE_UPLOADER_STATE.FAILURE && (
        <div class="drag-container">File Upload failed. Please try again!</div>
      )}
    </>
  );
};

export default FileUploader;
