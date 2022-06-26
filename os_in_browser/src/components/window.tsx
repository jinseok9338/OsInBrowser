import { JSX } from "solid-js/jsx-runtime";

interface WindowComponentProps {
  process: JSX.Element;
  processName: string;
}

const WindowComponent = ({ process, processName }: WindowComponentProps) => {
  return (
    <div class="window_container">
      <div class="row">
        <div class="column row-left">
          <span class="row-dot" style="background:#ED594A;"></span>
          <span class="row-dot" style="background:#FDD800;"></span>
          <span class="row-dot" style="background:#5AC05A;"></span>
        </div>

        <div class="column row-middle">
          <span>{processName}</span>
        </div>
      </div>
      <div class="content">{process}</div>
    </div>
  );
};

export default WindowComponent;
