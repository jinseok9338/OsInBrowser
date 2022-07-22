import get from "lodash/get";
import { fileValidator, preventBrowserDefaults } from "./drag-drop-util";
import { createSignal, JSX } from "solid-js";
import { configType } from "./fileUploader";

interface DragAndDropProps {
  processDrop: (files: Blob[]) => void;
  config: configType;
  children: JSX.Element;
}

const DragAndDrop = ({ processDrop, config, children }: DragAndDropProps) => {
  const [dragOverlay, setDragOverlay] = createSignal(false);
  const [data, setData] = createSignal("");
  const [error, setError] = createSignal("");
  const [dragCounter, setDragCounter] = createSignal(0);

  const handleDrag = (e: Event) => {
    preventBrowserDefaults(e);
  };
  const handleDragIn = (e: Event) => {
    preventBrowserDefaults(e);
    setDragCounter((prev) => prev + 1);
    if (get(e, "dataTransfer.items.length") > 0) {
      setDragOverlay(true);
    }
  };
  const handleDragOut = (e: Event) => {
    preventBrowserDefaults(e);
    setDragCounter((prev) => prev - 1);
    if (dragCounter() === 0) {
      setDragOverlay(false);
    }
  };
  const handleDrop = (e: Event) => {
    const files = get(e, "dataTransfer.files");
    preventBrowserDefaults(e);
    setDragOverlay(false);
    setError("");
    setDragCounter(0);
    const { isValidFile, errVal } = fileValidator(files, config);
    if (!isValidFile) {
      if (errVal) {
        setError(errVal);
      }
      return false;
    }
    fileReader(files);
    processDrop(files);
  };

  const fileReader = (files: Blob[]) => {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (loadEvt) => {
      setData(loadEvt.target!.result! as string);
    };
  };

  const dragOverlayClass = dragOverlay() ? "overlay" : "";

  return (
    <div>
      {error() && <p class="error">{error()}</p>}
      {data() && <p class="error">{data()}</p>}
      <div
        class={`drag-container ${dragOverlayClass}`}
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
