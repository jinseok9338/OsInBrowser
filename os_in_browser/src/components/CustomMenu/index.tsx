import { Accessor, For } from "solid-js";
import CustomMenuItem from "./customMenuItem";

interface CustomMenuProps {
  open: Accessor<boolean>;
  position: {
    left: number;
    top: number;
  };
  menus: {
    title: string;
    iconPath: string;
    onClick: (...args: any) => void;
  }[];
}

const CustomMenu = ({ open, position, menus }: CustomMenuProps) => {
  return (
    <div
      class="customMenu"
      style={` top: ${position.top}px;
          left: ${position.left}px;
          display:${open() ? "flex" : "none"}`}
    >
      <For each={menus} fallback={<div>Loading...</div>}>
        {(menu) => (
          <CustomMenuItem
            title={menu.title}
            iconPath={menu.iconPath}
            onClick={menu.onClick}
          />
        )}
      </For>
    </div>
  );
};

export default CustomMenu;
