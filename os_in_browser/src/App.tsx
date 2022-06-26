import { createSignal, onCleanup } from "solid-js";
import {
  ProcessDirectoryProvider,
  useProcess,
} from "./context/processDirectory";
import Main from "./main";
import "./assets/stylesheet/desktop.css";
import "./assets/stylesheet/global.css";
import "./assets/stylesheet/variables.css";
import "./assets/stylesheet/window.css";

const App = () => {
  return (
    <ProcessDirectoryProvider>
      <Main />
    </ProcessDirectoryProvider>
  );
};

export default App;
