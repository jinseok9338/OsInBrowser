import { JSX } from "solid-js/jsx-runtime";

interface Submenu {
  children?: JSX.Element;
  position?: "left" | "right" | "bottom" | "left-top" | "right-top";
  className?: string;
}

const Submenu = ({
  children,
  position = "right",
  className = "",
  ...props
}: Submenu) => (
  <div class={`submenu submenu-${position} ${className}`} {...props}>
    <ul>{children}</ul>
  </div>
);

export default Submenu;
