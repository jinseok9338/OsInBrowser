import { For } from "solid-js";
import { Menus } from "../../../types/processDirectory";

const DropDownMenu = (menus: Menus) => {
  return (
    <>
      <div class="menus">{menus.starting}</div>
      <For each={menus.menus}>
        {(menu) => (
          <div class="menus">
            <span>{"File"}</span>
            <div class="dropdown-content">
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
          </div>
        )}
      </For>
    </>
  );
};

export default DropDownMenu;
