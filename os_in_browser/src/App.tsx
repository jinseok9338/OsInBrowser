import { createSignal, onCleanup } from "solid-js";
import {
  ProcessDirectoryProvider,
  useProcess,
} from "./context/processDirectory";
import Main from "./main";

const App = () => {
  return (
    <ProcessDirectoryProvider>
      <Main />
    </ProcessDirectoryProvider>
  );
};

export default App;
