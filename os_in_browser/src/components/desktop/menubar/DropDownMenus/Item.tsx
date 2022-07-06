interface ItemProps {
  children: ChildNode;
  onClick: (e: MouseEvent) => void;
  isActive: boolean;
  className: string;
  isDisabled: boolean;
}

const Item = ({
  children,
  onClick,
  isActive = false,
  className,
  isDisabled = false,
  ...props
}: ItemProps) => (
  <li
    class={`item ${isActive && "item-active"} ${className} ${
      isDisabled && "item-disabled"
    }`}
    onClick={isDisabled ? () => null : onClick}
    tabIndex={0}
    {...props}
  >
    {children}
  </li>
);

export default Item;
