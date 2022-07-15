import { createSignal, onMount, Accessor, createEffect } from "solid-js";

interface FileInfoProps {
  name: string;
  top: Accessor<number>;
  left: Accessor<number>;
  id: string;
  filePath: string;
}

const FileInfo = ({ name, top, left, id, filePath }: FileInfoProps) => {
  return (
    <div
      class="fileInfo"
      id={`fileInfo ${id}`}
      style={`top:${top()}px; left:${left()}px;`}
    >
      <span
        style={{
          margin: "2px 5px 2px 5px ",
        }}
      >
        {name}
      </span>
      <span
        style={{
          margin: "2px 5px 2px 5px ",
        }}
      >
        {filePath}
      </span>
    </div>
  );
};

export default FileInfo;

// style={`top:${}px, left:${}px`}
