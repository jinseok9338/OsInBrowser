import { Menu } from "../../types/processDirectory";
import { Accessor } from "solid-js";

interface customMenuItemProps {
  iconPath?: string;
  title: string;
  onClick: (...args: any) => void;
}

const CustomMenuItem = ({ iconPath, title, onClick }: customMenuItemProps) => {
  return (
    <div class="customMenuItem" onClick={(e) => onClick(e)}>
      <div class="customMenuIcon">
        <i class={iconPath} aria-hidden="true"></i>
      </div>
      <span class="customMenuTitle">{title}</span>
    </div>
  );
};

export default CustomMenuItem;
