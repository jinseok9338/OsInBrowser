import { FSModule } from "browserfs/dist/node/core/FS";
import { basename } from "path";
import { createEffect, createSignal, For, onMount } from "solid-js";
import { useFileSystem } from "../../context/windowFileSystem";
import { useFiles } from "../../hooks/useFiles";
import { FileEntry } from "./fileEntry";
import { finderFunction } from "./finderFunction";
import air from "./images/apps/air.png";

interface FinderMainProps {
  directory?: string;
  fs: FSModule;
}

const FinderMain = ({ directory, fs }: FinderMainProps) => {
  const { setFocus, deselectAll } = finderFunction();
  const [fileSystem, setFileSystem] = createSignal<FSModule | null>(null);
  console.log(fs);

  const makeFile = () => {
    fs.writeFile(
      "/test.txt",
      "Cool, I can do this in the browser!",
      function (err) {
        fs.readFile("/test.txt", function (err, contents) {
          console.log(contents!.toString());
        });
      }
    );
  };

  return (
    <div
      class="box-main"
      id="main-box"
      ref={(el) =>
        el.addEventListener("click", (e) => {
          if (!(e.target! as HTMLElement).classList.contains("img")) {
            deselectAll(e);
          }
        })
      }
    >
      <button onClick={makeFile}></button>
      <For each={[{ name: "file", path: air }]}>
        {(item, index) => <FileEntry name={item.name} path={item.path} />}
      </For>
    </div>
  );
};

export default FinderMain;
