import { ProcessDirectoryProvider } from "./context/processDirectory";
import { FileSystemProvider } from "./context/windowFileSystem";
import Main from "./main";
import "./style/desktop/desktop.scss";
import "./style/global.scss";
import "./style/variables.scss";
import "./style/window.scss";
import "./style/finder.scss";

//Divider css
import "./style/desktop/menubar/dropdownMenu/divider.scss";
import "./style/desktop/menubar/dropdownMenu/dropdown.scss";
import "./style/desktop/menubar/dropdownMenu/item.scss";
import "./style/desktop/menubar/dropdownMenu/submenu.scss";

//customMenu
import "./style/customMenu/customMenu.scss";
import { FileDirectoryProvider } from "./context/FileDirectoryContext";

const App = () => {
  return (
    <FileSystemProvider>
      <ProcessDirectoryProvider>
        <FileDirectoryProvider>
          <Main />
        </FileDirectoryProvider>
      </ProcessDirectoryProvider>
    </FileSystemProvider>
  );
};

export default App;
