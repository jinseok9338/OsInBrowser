interface Submenu {
  children: ChildNode;
  position: "left" | "right" | "bottom" | "left-top" | "right-top";
  className: string;
}

const Submenu = ({
  children,
  position = "left",
  className,
  ...props
}: Submenu) => (
  <div class={`submenu submenu-${position} ${className}`} {...props}>
    <ul>{children}</ul>
  </div>
);

export default Submenu;
