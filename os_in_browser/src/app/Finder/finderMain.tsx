import { FSModule } from "browserfs/dist/node/core/FS";

import { createEffect, createSignal, For } from "solid-js";
import { useFileDirectory } from "../../context/FileDirectoryContext";

import { FileEntry } from "./fileEntry";
import { finderFunction } from "./finderFunction";
import { setIcon } from "./finderFunction/setIcon";

interface FinderMainProps {
  directory?: string;
  fs: FSModule;
}

const FinderMain = ({ directory, fs }: FinderMainProps) => {
  const [currentDirectory, { ChangeDirectory }] = useFileDirectory();

  const { setFocus, deselectAll } = finderFunction();
  const [files, setFiles] = createSignal(
    [] as { name: string; path: string }[]
  );

  createEffect(() => {
    let cd = currentDirectory.currentDirectory;
    fs.readdir(cd, function (_err, contents) {
      let files = contents?.map((value) => ({
        name: value,
        path: setIcon(value),
      }));
      setFiles(files!);
    });
    return cd;
  });

  const makeFile = (e: MouseEvent) => {
    let cd = currentDirectory.currentDirectory;
    fs.writeFile(`${cd}/test.txt`, () => {
      fs.readdir(cd, function (_err, contents) {
        let files = contents?.map((value) => ({
          name: value,
          path: setIcon(value),
        }));
        setFiles(files!);
      });
    });
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
      <For each={files()}>
        {(item, index) => <FileEntry name={item.name} path={item.path} />}
      </For>
    </div>
  );
};

export default FinderMain;
