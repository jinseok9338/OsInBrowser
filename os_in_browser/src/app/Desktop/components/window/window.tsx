import { JSX } from "solid-js/jsx-runtime";
import { useProcess } from "../../../../context/processDirectory";
import useDrag from "./useDrag";
import { Dimension } from "../../../../types/processDirectory";

import Resizers from "./resizer";

interface WindowComponentProps {
  processName: string;
  dimension: Dimension;
  process: JSX.Element;
  id: string;
}

const WindowComponent = ({
  process,
  processName,
  dimension,
  id,
}: WindowComponentProps) => {
  const [state, { deleteProcess, enlarge, changeProcessDimension }] =
    useProcess();
  const { onMouseDown } = useDrag(changeProcessDimension, id, dimension);

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
            onclick={() => {
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
