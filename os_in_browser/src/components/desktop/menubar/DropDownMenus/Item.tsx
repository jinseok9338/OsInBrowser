import { JSX } from "solid-js/jsx-runtime";

interface ItemProps {
  children?: JSX.Element;
  onClick?: (e: MouseEvent) => void;
  isActive?: boolean;
  className?: string;
  isDisabled?: boolean;
}

const Item = ({
  children,
  onClick,
  isActive = false,
  className = "",
  isDisabled = false,
  ...props
}: ItemProps) => {
  const onClickEvent = onClick ? onClick : () => null;
  return (
    <li
      class={`item ${isActive && "item-active"} ${className} ${
        isDisabled && "item-disabled"
      }`}
      onClick={isDisabled ? () => null : onClickEvent}
      tabIndex={0}
      {...props}
    >
      {children}
    </li>
  );
};

export default Item;
