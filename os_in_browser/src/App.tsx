import { ProcessDirectoryProvider } from "./context/processDirectory";
import { FileSystemProvider } from "./context/windowFileSystem";
import Main from "./app/Desktop";
import "./style/desktop.scss";
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
import "./style/customMenu.scss";

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
