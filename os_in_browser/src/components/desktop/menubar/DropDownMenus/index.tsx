import { createSignal, onMount, Ref } from "solid-js";
import Divider from "./devider";
import Item from "./Item";
import Submenu from "./Submenu";

interface DropdownProps {
  title?: string;
  buttonVariant:
    | "primary"
    | "secondary"
    | "tertiary"
    | "special"
    | "special-success"
    | "dashed";
  isActive: boolean;
  children?: ChildNode;
  isDisabled: boolean;
  position: "left" | "right" | "top-right" | "top-left";
  wrapperClassName?: string;
  buttonClassName?: string;
  menuClassName?: string;
  onClick: (e: MouseEvent) => void;
  openOnHover: boolean;
  ref: HTMLDivElement;
}

const Dropdown = ({
  title = "",
  children,
  isDisabled = false,
  position = "left",
  wrapperClassName,
  buttonClassName,
  menuClassName,
  onClick,
  isActive = false,
  buttonVariant = "secondary",
  openOnHover = false,
  ref,
  ...props
}: DropdownProps) => {
  const [isOpen, setOpen] = createSignal(false);

  const handleClick = (e: MouseEvent) => {
    if (ref.contains(e.target as Node)) {
      setOpen(false);
      document.removeEventListener("mousedown", handleClick);
    }
  };

  onMount(() => {
    document.removeEventListener("mousedown", handleClick);
  });

  const handleButtonOnClick = (e: MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (isDisabled) {
      return;
    }

    onClick(e);

    setOpen(!isOpen());

    if (isOpen()) {
      document.removeEventListener("mousedown", handleClick);
    } else {
      document.addEventListener("mousedown", handleClick);
    }
  };

  return (
    <div class={`dropdown ${wrapperClassName}`} ref={ref}>
      <button
        type="button"
        class={`dropdownBtn ${(isOpen() || isActive) && "dropdownActive"} ${
          isDisabled && "dropdownDisabled"
        } ${
          isDisabled && "dropdownDisabled"
        } ${buttonVariant} ${buttonClassName}`}
        disabled={isDisabled}
        tabIndex={0}
        onClick={!openOnHover ? handleButtonOnClick : undefined}
        onMouseOver={openOnHover ? handleButtonOnClick : undefined}
        {...props}
      >
        {title}
      </button>
      {isOpen() && (
        <div class={`menustyle menu${position} ${menuClassName}`}>
          <ul>{children}</ul>
        </div>
      )}
    </div>
  );
};

Dropdown.displayName = "Dropdown";
Dropdown.Item = Item;
Dropdown.Submenu = Submenu;
Dropdown.Divider = Divider;

export default Dropdown;

// https://github.com/kontentino/react-multilevel-dropdown/blob/master/src/img/example.png
