import { JSX } from "solid-js/jsx-runtime";

import { Dimension } from "../types/processDirectory";
import useDrag from "../hooks/useDrag";
import Resizers from "./resizer";
import { useProcess } from "../context/processDirectory";

interface WindowComponentProps {
  processName: string;
  dimension: Dimension;
  process: JSX.Element;
  id: string;
  changeProcessDimension: (id: string, dimension: Dimension) => void;
}

const WindowComponent = ({
  process,
  processName,
  dimension,
  id,
  changeProcessDimension,
}: WindowComponentProps) => {
  const { onMouseDown } = useDrag(changeProcessDimension, id, dimension);
  const [state, { deleteProcess, enlarge }] = useProcess();

  return (
    <div
      class="window_container"
      style={`left:${dimension.left}px; top:${dimension.top}px; width:${dimension.width}px; height:${dimension.height}px`}
    >
      <Resizers id={id} dimension={dimension} />
      <div class="row" onMouseDown={onMouseDown}>
        <div class="column row-left">
          <span
            class="row-dot"
            style="background:#ED594A;"
            onclick={() => deleteProcess(id)}
          ></span>
          <span class="row-dot" style="background:#FDD800;"></span>
          <span
            class="row-dot"
            style="background:#5AC05A;"
            onclick={(e: MouseEvent) => {
              enlarge(id);
            }}
          ></span>
        </div>

        <div class="column row-middle">
          <span>{processName != undefined ? processName : ""}</span>
        </div>
      </div>
      <div class="content">{process}</div>
    </div>
  );
};

export default WindowComponent;
