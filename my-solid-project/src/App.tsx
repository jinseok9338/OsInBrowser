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

//Divider css
import "./style/desktop/menubar/dropdownMenu/divider.scss";
import "./style/desktop/menubar/dropdownMenu/dropdown.scss";
import "./style/desktop/menubar/dropdownMenu/item.scss";
import "./style/desktop/menubar/dropdownMenu/submenu.scss";

//customMenu
import "./style/customMenu.scss";
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
