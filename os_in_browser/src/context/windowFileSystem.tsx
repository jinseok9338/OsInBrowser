import { createSignal, createEffect, onMount, Accessor } from "solid-js";
import * as BrowserFS from "browserfs";
import { FSModule } from "browserfs/dist/node/core/FS";

type FileSystemContextState = {
  fs: Accessor<FSModule | null>;
};

const fileSystemcontext = (): FileSystemContextState => {
  const [fs, setFs] = createSignal<FSModule | null>(null);

  onMount(() => {
    BrowserFS.install(window);

    BrowserFS.configure(
      {
        fs: "indexedDb",
      },
      () => {
        setFs(BrowserFS.BFSRequire("fs"));
      }
    );
  });
  // on load  install the BrowserFS

  return { fs };
};

export default fileSystemcontext;
