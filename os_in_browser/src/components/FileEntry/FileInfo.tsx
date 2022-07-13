interface FileInfoProps {
  name: string;
}

const FileInfo = ({ name }: FileInfoProps) => {
  return <div class="fileInfo">{name}</div>;
};

export default FileInfo;
