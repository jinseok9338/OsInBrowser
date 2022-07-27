import { Accessor } from "solid-js";

interface FileInfoProps {
  name: string;
  top: Accessor<number>;
  left: Accessor<number>;
  id: string;
  filePath: string;
  filetype: string;
  className: string;
}

const FileInfo = ({
  name,
  top,
  left,
  id,
  filePath,
  filetype,
  className,
}: FileInfoProps) => {
  return (
    <div
      class="fileInfo"
      id={`fileInfo ${id} ${className}`}
      style={`top:${top()}px; left:${left()}px;`}
    >
      <span
        style={{
          margin: "2px 5px 2px 5px ",
        }}
      >
        {"file name: "}
        {name}
      </span>
      <span
        style={{
          margin: "2px 5px 2px 5px ",
        }}
      >
        {"file path: "}
        {filePath}
      </span>
      <span
        style={{
          margin: "2px 5px 2px 5px ",
        }}
      >
        {"file type: "}
        {filetype}
        {" type"}
      </span>
    </div>
  );
};

export default FileInfo;

// style={`top:${}px, left:${}px`}
