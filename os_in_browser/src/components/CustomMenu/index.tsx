import { Accessor, For } from "solid-js";

interface CustomMenuProps {
  open: Accessor<boolean>;
  position: {
    left: number;
    top: number;
  };
}
const List = [1, 2, 3, 4, 5, 67];

const CustomMenu = ({ open, position }: CustomMenuProps) => {
  return (
    <div
      class="customMenu"
      style={` top: ${position.top}px;
          left: ${position.left}px;
          display:${open() ? "block" : "none"}`}
    >
      <For each={List} fallback={<div>Loading...</div>}>
        {(item) => <div>{item}</div>}
      </For>
    </div>
  );
};

export default CustomMenu;
