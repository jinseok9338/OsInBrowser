import { ProcessDirectoryProvider } from "./context/processDirectory";
import { FileSystemProvider } from "./context/windowFileSystem";
import Main from "./app/Desktop";
import "./style/desktop.scss";
import "./style/global.scss";
import "./style/variables.scss";
import "./style/window.scss";
import "./style/finder.scss";
import "./style/loader.scss";
import "./style/dragDrop.scss";
import "./style/tooltip.scss";

//customMenu
import "./style/customMenu.scss";

//circularMenu
import "./style/circularMenu.scss";
import { FilesProvider } from "./context/FilesContext";

const App = () => {
  return (
    <FileSystemProvider>
      <FilesProvider>
        <ProcessDirectoryProvider>
          <Main />
        </ProcessDirectoryProvider>
      </FilesProvider>
    </FileSystemProvider>
  );
};

export default App;
