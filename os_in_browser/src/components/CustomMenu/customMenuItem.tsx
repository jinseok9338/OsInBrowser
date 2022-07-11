import { Menu } from "../../types/processDirectory";

interface customMenuItemProps {
  iconPath?: string;
  title: string;
  onClick: () => void;
}

const CustomMenuItem = ({ iconPath, title, onClick }: customMenuItemProps) => {
  return (
    <div class="customMenuItem" onClick={() => onClick()}>
      <div class="customMenuIcon">
        <i class={iconPath} aria-hidden="true"></i>
      </div>
      <span class="customMenuTitle">{title}</span>
    </div>
  );
};

export default CustomMenuItem;
