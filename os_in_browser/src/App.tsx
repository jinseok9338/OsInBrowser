import { createSignal, onCleanup } from "solid-js";
import {
  ProcessDirectoryProvider,
  useProcess,
} from "./context/processDirectory";
import { FileSystemProvider } from "./context/windowFileSystem";
import Main from "./main";
import "./style/desktop.scss";
import "./style/global.scss";
import "./style/variables.scss";
import "./style/window.scss";
import "./style/finder.scss";
import "./style/onClickDragBox.scss";
import { FileDirectoryProvider } from "./context/FileDirectoryContext";

const App = () => {
  return (
    <FileSystemProvider>
      <ProcessDirectoryProvider>
        <Main />
      </ProcessDirectoryProvider>
    </FileSystemProvider>
  );
};

export default App;
