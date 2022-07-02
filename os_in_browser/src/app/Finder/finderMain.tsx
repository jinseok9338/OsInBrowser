import { For } from "solid-js";
import { FileEntry } from "./fileEntry";
import { finderFunction } from "./finderFunction";
import air from "./images/apps/air.png";

const FinderMain =() =>{
    const { setFocus, deselectAll } = finderFunction();
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
        <For each={[{name:"file",
                    path:air}]}>
          {(item, index) => (
         <FileEntry name={item.name} path={item.path}/>
          )}
        </For>
      </div>
    )
}

export default  FinderMain