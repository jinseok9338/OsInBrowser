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
  const [state, { deleteProcess, enlarge, changeProcessDimension, shrink }] =
    useProcess();
  const { onMouseDown } = useDrag(changeProcessDimension, id, dimension);

  const currentProcess = state.find((process) => process.id == id);
  return (
    <div
      class="window_container"
      id={id}
      style={`left:${dimension.left}px;
       top:${dimension.top}px;
        width:${dimension.width}px;
         height:${dimension.height}px;
         ${currentProcess?.isShrunk ? "display:none;" : "display:block;"}
      `}
    >
      <Resizers id={id} dimension={dimension} />
      <div class="row" onMouseDown={onMouseDown}>
        <div class="column row-left">
          <span
            class="row-dot"
            style="background:#ED594A;"
            onclick={() => deleteProcess(id)}
          ></span>
          <span
            class="row-dot"
            style="background:#FDD800;"
            onClick={() => {
              shrink(id);
            }}
          ></span>
          <span
            class="row-dot"
            style="background:#5AC05A;"
            onclick={() => {
              enlarge(id);
            }}
          ></span>
        </div>

        <div class="column row-middle">
          <span>{processName ? processName : ""}</span>
        </div>
      </div>
      <div
        class="content"
        style={`${id == "finder" ? "height: calc(100% - 50px);" : "100%"}`}
      >
        {process}
      </div>
    </div>
  );
};

export default WindowComponent;
