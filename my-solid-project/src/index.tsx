/* @refresh reload */
import { render } from "solid-js/web";

import App from "./App";

const dispose = render(
  () => <App />,
  document.getElementById("root") as HTMLElement
);

// HMR stuff, this will be automatically removed during build
if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(dispose);
}
