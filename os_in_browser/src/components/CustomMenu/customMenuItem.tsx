import { Menu } from "../../types/processDirectory";

interface customMenuItemProps {
  iconPath?: string;
  title: string;
}

const CustomMenuItem = ({ iconPath, title }: customMenuItemProps) => {
  return (
    <div class="customMenuItem">
      <div class="customMenuIcon">
        <i class={iconPath} aria-hidden="true"></i>
      </div>
      <span class="customMenuTitle">{title}</span>
    </div>
  );
};

export default CustomMenuItem;
